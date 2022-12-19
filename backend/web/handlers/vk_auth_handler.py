from logging import getLogger
from typing import Union
from urllib.parse import urlencode

import config
from aiohttp import web
from aiohttp_pydantic import PydanticView
from aiohttp_pydantic.oas.typing import r200, r302, r400, r403
from common import context, errors, utils
from common.db.basic import manager
from common.db.models import CSRFToken, User
from common.models.internal_models import VKOauthResponse
from common.security import create_access_token

log = getLogger(__name__)


class StartLoginHandler(PydanticView):

    async def get(self) -> r200[str]:
        """
        Запрос для авторизации/регистрации юзера в сервисе через ВК.

        Status Codes:
            200: В теле будет ссылка для перенаправления

        Tags: auth
        """
        csrf_token = await CSRFToken.create()
        params = {
            'client_id': config.VK_CLIENT_ID,
            'redirect_uri': config.VK_REDIRECT_URI,
            'scope': config.VK_SCOPE,
            'response_type': 'code',
            'state': csrf_token.token,
        }
        query = urlencode(params)
        return web.HTTPOk(text=f'{config.VK_AUTHORIZE_URL}?{query}')


class VKCodeResponse(PydanticView):

    async def get(self) -> Union[r302, r403, r400]:
        """
        Хендлер, на который перенаправляется юзер после авторизации в вк.

        Status Codes:
            302: Редирект на FRONTEND_FINISH_AUTH_URL
            403: Пришли со state, которого мы не знаем
            400: Какая-то ошибка в ответе от вк или при обмене кода на токены

        Tags: auth
        """
        request_data = self.request.query

        if 'error' in request_data:
            raise errors.VKOauthError(data=request_data)

        code = request_data.get('code')

        vk_client = context.vk_client.get()
        vk_response = await vk_client.change_code_to_token_response(code=code)

        if 'error' in vk_response:
            raise errors.VKOauthError(data=vk_response)

        data = VKOauthResponse(**vk_response)

        try:
            csrf_token = await CSRFToken.get(token=request_data.get('state'))
        except errors.DoesNotExists:
            raise errors.AccessDenied

        user_data = {
            **data.dict(exclude={'user_id'}),
            'internal_token': create_access_token(),
            'nickname': utils.create_default_nickname()
        }
        user, is_created = await manager.get_or_create(User, user_id=data.user_id, defaults=user_data)
        if not is_created:
            log.info('Already registered')
            await user.update_instance(**user_data)

        await manager.delete(csrf_token)

        response = web.HTTPFound(
            location=config.FRONTEND_FINISH_AUTH_URL,
            content_type='application/json',
        )

        response.cookies.clear()
        response.set_cookie(
            name=config.AUTH_HEADER_NAME,
            value=str(user.internal_token),
            expires=60 * 60 * 24,
        )

        return response
