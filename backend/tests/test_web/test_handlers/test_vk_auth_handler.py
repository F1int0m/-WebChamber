from unittest.mock import ANY

import config
from common.db.basic import manager
from common.db.models import CSRFToken, User
from tests.resources import mocks


async def test_start_login__ok(test_app):
    response = await test_app.get('/auth/vk/login-start', allow_redirects=False)
    assert response.status == 200

    tokens = await manager.execute(CSRFToken.select())
    assert len(tokens) == 1
    token: CSRFToken = tokens[0]

    assert await response.text() == (
        f'{config.VK_AUTHORIZE_URL}?'
        f'client_id={config.VK_CLIENT_ID}&'
        f'redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fvk%2Fcode-response&'
        'scope=email&'
        'response_type=code&'
        f'state={token.token}'
    )


async def test_code_response_handler__ok_good_response(test_app, mock_response, csrf_token: CSRFToken):
    test_code = 'test_vk_code'
    mock_response.get(
        url=(f'{config.VK_OAUTH_URL}/access_token?'
             f'client_id={config.VK_CLIENT_ID}&'
             f'client_secret={config.VK_CLIENT_SECRET}&'
             f'code={test_code}&'
             f'redirect_uri={config.VK_REDIRECT_URI}'),
        payload=mocks.mock_vk_code_response_success()
    )

    assert await manager.count(CSRFToken.select()) == 1

    response = await test_app.get(
        f'/auth/vk/code-response?code={test_code}&state={csrf_token.token}',
        allow_redirects=False
    )
    assert response.status == 302

    assert response.cookies == {'webchamber_token': ANY}
    token = response.cookies.get('webchamber_token').value

    user = await User.get(internal_token=token)
    assert user.to_dict() == {
        'avatar_link': None,
        'description': None,
        'mood_text': None,
        'nickname': ANY,
        'role': 'ACTIVE',
        'user_id': '1234567'
    }
    assert user.internal_token == token

    assert await manager.count(CSRFToken.select()) == 0


async def test_code_response_handler__error_vk_error_response(test_app, mock_response, csrf_token: CSRFToken):
    test_code = 'test_vk_code'
    mock_response.get(
        url=(f'{config.VK_OAUTH_URL}/access_token?'
             f'client_id={config.VK_CLIENT_ID}&'
             f'client_secret={config.VK_CLIENT_SECRET}&'
             f'code={test_code}&'
             f'redirect_uri={config.VK_REDIRECT_URI}'),
        payload=mocks.mock_vk_code_response_error(),
        status=401,
    )

    assert await manager.count(CSRFToken.select()) == 1

    response = await test_app.get(
        f'/auth/vk/code-response?code={test_code}&state={csrf_token.token}',
        allow_redirects=False
    )
    assert response.status == 400

    assert await response.json() == {
        'code': 5001,
        'data': {'error': 'invalid_grant', 'error_description': 'Code is expired.'},
        'message': 'VK oauth integration error'
    }

    assert await manager.count(User.select()) == 0
    assert await manager.count(CSRFToken.select()) == 1
