import config
import pytest


async def test_ping__ok(public_api_v1):
    response = await public_api_v1(method='ping')
    assert response == {
        'id': 2,
        'jsonrpc': '2.0',
        'result': {'text': 'pong!'}
    }


@pytest.mark.parametrize('cookies', [
    {config.AUTH_HEADER_NAME: None},
    {config.AUTH_HEADER_NAME: ''},
    {config.AUTH_HEADER_NAME: 'any other token'},
    {},
])
async def test_ping__error_unauthorized(test_app, cookies):
    response = await test_app.post(path='/api/v1/public/jsonrpc', cookies=cookies)
    assert response.status == 403
