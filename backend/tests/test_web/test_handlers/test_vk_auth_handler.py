import config
from common.db.basic import manager
from common.db.models import CSRFToken
from tests.resources import mocks


async def test_start_login__ok(test_app):
    response = await test_app.get('/auth/vk/login-start', allow_redirects=False)
    assert response.status == 302

    tokens = await manager.execute(CSRFToken.select())
    assert len(tokens) == 1
    token: CSRFToken = tokens[0]

    assert response.headers['Location'] == (
        f'{config.VK_REDIRECT_URI}?'
        f'client_id={config.VK_CLIENT_ID}&'
        f'redirect_uri={config.VK_REDIRECT_URI}&'
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
    response = await test_app.get(f'/auth/vk/code_response?code={test_code}&state={csrf_token.token}')
    assert response.status == 200
