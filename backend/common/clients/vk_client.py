from urllib.parse import urlencode

import config
from common.clients.base_client import BaseClient


class VKClient(BaseClient):
    base_url = config.VK_OAUTH_URL
    raise_for_status = False

    async def change_code_to_token_response(self, code) -> dict:
        params = {
            'client_id': config.VK_CLIENT_ID,
            'client_secret': config.VK_CLIENT_SECRET,
            'redirect_uri': config.VK_REDIRECT_URI,
            'code': code,
        }
        query = urlencode(params)

        return await self.get(path=f'/access_token?{query}')
