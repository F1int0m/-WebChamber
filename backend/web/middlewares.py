import logging
import uuid

from aiohttp import web
from common import context

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
    context.app.set(request.app)

    return await handler(request)
