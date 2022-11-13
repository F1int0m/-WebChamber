import asyncio
import sys
from logging import getLogger

import config
from aiohttp import web
from aiohttp_pydantic import oas
from common import db
from common.clients.vk_client import VKClient
from web.handlers import vk_auth_handler
from web.methods import api_v1
from web.middlewares import check_auth, json_response, set_context

log = getLogger(__name__)


async def prepare_app_to_start(application):
    db_manager = await db.start()
    application['db_manager'] = db_manager
    log.info('DB concected')

    application['vk_client'] = VKClient()


async def prepare_app_to_stop(application):
    await db.close()


def init_app():
    application = web.Application(middlewares=[set_context])

    jsonrpc_api_v1 = web.Application(middlewares=[check_auth])
    oauth_app = web.Application(middlewares=[json_response])

    oauth_app.router.add_route('GET', '/vk/login-start', vk_auth_handler.StartLoginHandler)
    oauth_app.router.add_route('GET', '/vk/code_response', vk_auth_handler.VKCodeResponse)

    jsonrpc_api_v1.router.add_route('POST', '/v1/public/jsonrpc', api_v1.route)

    application.add_subapp('/api', jsonrpc_api_v1)
    application.add_subapp('/auth', oauth_app)

    application.router.add_route('GET', '/doc/openrpc.json', api_v1.get_openrpc_doc)
    oas.setup(application, url_prefix='/docs/openapi')

    application.on_startup.append(prepare_app_to_start)
    application.on_cleanup.append(prepare_app_to_stop)

    log.info('App inited')
    return application


def init():
    if sys.platform.lower().startswith('win'):
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    app = init_app()

    web.run_app(app=app, host=config.HOST, port=config.PORT, shutdown_timeout=60, print=log.info)


if __name__ == '__main__':
    init()
