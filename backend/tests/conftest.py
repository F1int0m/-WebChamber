import asyncio
import sys
from functools import partial
from typing import Awaitable, Callable, Dict, List

import aiohttp
import config
import pytest
from aioresponses import aioresponses
from common import db, enums
from common.db.models import CSRFToken, Subscription, User, UserNotification
from common.enums import UserRoleEnum
from common.utils import create_default_nickname, uuid_str
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


@pytest.fixture
def authorized_api_client(test_app, user: User) -> Callable:
    async def _request(
            url: str,
            method: str = 'POST',
            cookies: dict = None,
            **kwargs
    ) -> aiohttp.ClientResponse:
        cookies = cookies or {config.TOKEN_COOKIE_NAME: user.internal_token}

        response: aiohttp.ClientResponse = await test_app.request(
            method=method, path=url, cookies=cookies, **kwargs
        )
        return response

    return _request


@pytest.fixture(scope='session', autouse=True)
async def init_db():
    await db.start()
    db.create_tables()


@pytest.fixture(scope='function', autouse=True)
async def clean_db(init_db):
    yield

    for table in db.tables:
        table.truncate_table(cascade=True)


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
def public_api_v1(jsonrpc_client, user) -> Callable[..., Awaitable[Dict]]:
    return partial(jsonrpc_client, url='/api/v1/public/jsonrpc', user=user)


@pytest.fixture
def user_factory():
    async def wrapped(
            user_id=None,
            internal_token=None,
            access_token=None,
            expires_at=None,
            nickname=None,
            role=None,
            avatar_link=None,
            description=None,
            mood_text=None,
    ) -> User:
        params = {
            'user_id': user_id or uuid_str(),
            'internal_token': internal_token or uuid_str(),
            'access_token': access_token or 'access_token',
            'expires_at': expires_at or '2030-12-30',
            'nickname': nickname or create_default_nickname(),
            'role': role or UserRoleEnum.platform_owner,
            'description': description or 'description of user',
            'mood_text': mood_text or 'mood text of user',
            'avatar_link': avatar_link or 'http://test.com/avatar.png'
        }

        user = await User.create(**params)
        return user

    return wrapped


@pytest.fixture
def subscribes_factory():
    async def wrapped(user, subscribers: List) -> List:
        result = []
        for subscriber in subscribers:
            result.append(await Subscription.create(main_user=user, subscriber_user=subscriber))

        return result

    return wrapped


@pytest.fixture
async def csrf_token() -> CSRFToken:
    token = await CSRFToken.create()
    return token


@pytest.fixture
async def user(user_factory):
    return await user_factory(mood_text='mood')


@pytest.fixture()
def notification_factory():
    async def wrapped(
            user_to_create,
            notifications_list: List[enums.NotificationTypeEnum] = None
    ):
        result = notifications_list or enums.NotificationTypeEnum
        for notification_type in result:
            await UserNotification.create(user_id=user_to_create, notification_type=notification_type)

    return wrapped
