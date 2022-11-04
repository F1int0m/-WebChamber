import config


async def test_start_login__ok(test_app):
    response = await test_app.get('/auth/vk/login-start', allow_redirects=False)
    assert response.status == 302
    assert response.headers['Location'] == (
        f'{config.VK_OAUTH_URL}?'
        f'client_id={config.VK_CLIENT_ID}&'
        f'redirect_uri={config.VK_REDIRECT_URI}&'
        'scope=email&'
        'response_type=token&'
        'state=123'
    )


async def test_finish_login__ok(test_app):
    token = 'test_token'
    await test_app.get(
        ('/auth/vk/login-start#'
         f'access_token={token}&'
         'expires_in=86400&'
         'user_id=8492&'
         'state=123456')
    )
