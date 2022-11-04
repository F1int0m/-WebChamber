import asyncio
from functools import partial
from typing import Awaitable, Callable, Dict

import pytest
from aioresponses import aioresponses
from common import db
from common.db.models import CSRFToken
from server import init_app


@pytest.fixture(scope='session', autouse=True)
def event_loop():
    yield asyncio.get_event_loop()


@pytest.fixture
async def mock_response():
    with aioresponses(passthrough=['http://127.0.0.1']) as mock:
        yield mock


@pytest.fixture
async def test_app(aiohttp_client):
    app = init_app()
    yield await aiohttp_client(app)


@pytest.fixture(scope='session', autouse=True)
async def init_db():
    await db.start()
    db.create_tables()


@pytest.fixture(scope='function', autouse=True)
async def clean_db(init_db):
    yield

    for table in db.tables:
        table.truncate_table()


@pytest.fixture
def jsonrpc_client(test_app):
    async def _jsonrpc(method: str, *, url: str = None, **params) -> Dict:
        jsonrpc_request = {
            'jsonrpc': '2.0',
            'id': 2,
            'method': method,
            'params': params or {},
        }

        response = await test_app.post(
            path=url, json=jsonrpc_request
        )
        result = await response.json()

        assert result['id'] == jsonrpc_request['id']
        return result

    return _jsonrpc


@pytest.fixture
def public_api_v1(jsonrpc_client) -> Callable[..., Awaitable[Dict]]:
    return partial(jsonrpc_client, url='/api/v1/public/jsonrpc')


@pytest.fixture
async def csrf_token() -> CSRFToken:
    token = await CSRFToken.create()
    return token
