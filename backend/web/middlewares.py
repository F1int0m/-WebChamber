import logging
import uuid

import config
from aiohttp import web, web_response
from common import context, errors
from common.db.models import User
from pydantic import BaseModel

log = logging.getLogger(__name__)


@web.middleware
async def set_context(request: web.Request, handler):
    """
    Просаживаем в контекст id запроса и сам запрос

    """
    context.x_request_id.set(
        request.headers.get('x-request-id', f'{request.host}-{uuid.uuid4()}')
    )
    context.request.set(request)
    context.vk_client.set(request.app['vk_client'])
    context.minio_client.set(request.app['minio_client'])
    context.app.set(request.app)

    return await handler(request)


@web.middleware
async def json_response(request: web.Request, handler):
    http_status = 200
    try:
        result = await handler(request)

        if isinstance(result, web_response.Response):
            return result

        elif isinstance(result, BaseModel):
            result = result.dict(exclude_none=True)

        elif result is None:
            result = {}

        else:
            raise web.HTTPInternalServerError

    except errors.BaseRPCError as exc:
        result = {'message': exc.message, 'code': exc.code, 'data': exc.rpc_error.data}
        http_status = exc.http_status

    return web.json_response(data=result, status=http_status)


@web.middleware
async def check_auth(request: web.Request, handler):
    if user_token := request.headers.get(config.AUTH_HEADER_NAME):
        try:
            user = await User.get_by_token(internal_access_token=user_token)
        except errors.DoesNotExists:
            log.info('Wrong token')
            return web.HTTPForbidden()

        context.user.set(user)
        return await handler(request)

    log.info('No header')

    return web.HTTPForbidden()
