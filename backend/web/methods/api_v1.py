from functools import partial

from aiohttp import web

from web.handlers.jsonrpc_handler import route
from common.models.response_models import PingResponse

from openrpc import RPCServer

openrpc = RPCServer(title='WebChamber api')

route = partial(route, openrpc_instance=openrpc)


async def get_openrpc_doc(_: web.Request):
    return web.json_response(openrpc.discover())


@openrpc.method()
def ping() -> PingResponse:
    return PingResponse()
