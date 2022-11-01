from aiohttp import web
from openrpc import RPCServer
from ujson import dumps


async def route(request, openrpc_instance: RPCServer):
    request_data = await request.text()
    response = await openrpc_instance.process_request_async(data=request_data)

    return web.json_response(text=response, dumps=dumps)
