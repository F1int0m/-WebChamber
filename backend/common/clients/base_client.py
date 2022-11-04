import logging
from functools import partial
from typing import Optional
from urllib.parse import urljoin

from aiohttp import ClientSession
from ujson import dumps

log = logging.getLogger(__name__)


class BaseClient:
    base_url: str = None
    raise_for_status: bool = True

    def get_session(self) -> ClientSession:
        return ClientSession(json_serialize=partial(dumps, reject_bytes=False, default=str))

    async def request(
            self,
            method: str,
            path: Optional[str] = None,
            **params,
    ) -> dict:
        full_url = urljoin(self.base_url, path)

        async with self.get_session() as session:
            async with session.request(method=method, url=full_url, **params) as response:
                json_response = await response.json()
                log.info(f'Get response {json_response=}')

                if self.raise_for_status:
                    response.raise_for_status()

                return json_response

    async def get(self, *args, **kwargs):
        return await self.request('GET', *args, **kwargs)

    async def post(self, *args, **kwargs):
        return await self.request('POST', *args, **kwargs)

    async def delete(self, *args, **kwargs):
        return await self.request('DELETE', *args, **kwargs)
