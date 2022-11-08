import asyncio
import sys
from functools import partial
from typing import Awaitable, Callable, Dict

import config
import pytest
from aioresponses import aioresponses
from common import db
from common.db.models import CSRFToken, User
from common.enums import UserRole
from common.utils import uuid_str
from server import init_app


@pytest.fixture(scope='session', autouse=True)
def event_loop():
    if sys.platform.lower().startswith('win'):
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

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
    async def _jsonrpc(method: str, *, url: str = None, user: User = None, cookies=None, **params) -> Dict:
        jsonrpc_request = {
            'jsonrpc': '2.0',
            'id': 2,
            'method': method,
            'params': params or {},
        }
        cookies = cookies or {}
        if user:
            cookies.update({config.TOKEN_COOKIE_NAME: user.internal_token})

        response = await test_app.post(
            path=url, json=jsonrpc_request, cookies=cookies
        )
        result = await response.json()

        assert result['id'] == jsonrpc_request['id']
        return result

    return _jsonrpc


@pytest.fixture
def user_factory():
    async def wrapped(
            user_id=None,
            internal_token=None,
            access_token=None,
            expires_at=None,
            nickname=None,
            role=None
    ) -> User:
        params = {
            'user_id': user_id or 'test_id',
            'internal_token': internal_token or uuid_str(),
            'access_token': access_token or 'access_token',
            'expires_at': expires_at or '2030-12-30',
            'nickname': nickname or 'test_user_nickname',
            'role': role or UserRole.platform_owner,
        }
        user = await User.create(**params)
        return user

    return wrapped


@pytest.fixture
def public_api_v1(jsonrpc_client, user) -> Callable[..., Awaitable[Dict]]:
    return partial(jsonrpc_client, url='/api/v1/public/jsonrpc', user=user)


@pytest.fixture
async def csrf_token() -> CSRFToken:
    token = await CSRFToken.create()
    return token


@pytest.fixture
async def user(user_factory):
    return await user_factory()
