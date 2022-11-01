from aiohttp import web, ClientSession
from urllib.parse import urlencode

import config


async def start_login(request: web.Request):
    params = {
        'client_id': config.VK_CLIENT_ID,
        'redirect_uri': config.VK_REDIRECT_URI,
        'scope': config.VK_SCOPE,
        'response_type': 'token',
        'state': '123'  # todo,
    }
    query = urlencode(params)

    return web.HTTPFound(location=f'{config.VK_OAUTH_URL}?{query}')


async def finish_login(request: web.Request):
    pass
