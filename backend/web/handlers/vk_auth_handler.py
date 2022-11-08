from logging import getLogger
from urllib.parse import urlencode

import config
from aiohttp import web
from common import context, errors, utils
from common.db.basic import manager
from common.db.models import CSRFToken, User
from common.models.internal_models import VKOauthResponse
from common.security import create_access_token

log = getLogger(__name__)


async def start_login(request: web.Request):
    csrf_token = await CSRFToken.create()
    params = {
        'client_id': config.VK_CLIENT_ID,
        'redirect_uri': config.VK_REDIRECT_URI,
        'scope': config.VK_SCOPE,
        'response_type': 'code',
        'state': csrf_token.token,
    }
    query = urlencode(params)

    return web.HTTPFound(location=f'{config.VK_AUTHORIZE_URL}?{query}')


async def code_response_handler(request: web.Request):
    request_data = request.query

    if 'error' in request_data:
        raise errors.VKOauthError(data=request_data)

    code = request_data['code']

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
        name=config.TOKEN_COOKIE_NAME,
        value=str(user.internal_token),
        expires=60 * 60 * 24,
    )

    return response
