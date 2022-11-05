from logging import getLogger

import config
from aiohttp import web
from web.methods import api_v1

log = getLogger(__name__)


def init_app():
    application = web.Application()

    jsonrpc_api_v1 = web.Application()

    jsonrpc_api_v1.router.add_route('POST', '/v1/public/jsonrpc', api_v1.route)

    application.add_subapp('/api', jsonrpc_api_v1)
    application.router.add_route('GET', '/doc/openrpc.json', api_v1.get_openrpc_doc)

    log.info('App inited')
    return application


def init():
    app = init_app()

    web.run_app(app=app, host=config.HOST, port=config.PORT, shutdown_timeout=60, print=log.info)


if __name__ == '__main__':
    init()
