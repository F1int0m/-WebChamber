from tests.resources import mocks


async def test_avatar_upload__ok(authorized_api_client):
    response = await authorized_api_client(url='/file/user-avatar/image.jpg', data=mocks.mock_avatar_file())
    assert response.status == 200
