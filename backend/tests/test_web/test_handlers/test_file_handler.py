from common.db.models import User
from tests.resources import mocks


async def test_avatar_upload__ok(authorized_api_client, user: User):
    response = await authorized_api_client(url='/file/user-avatar/image.jpg', data=mocks.mock_avatar_file())
    assert response.status == 200

    user = await user.refresh()
    assert user.avatar_link == f'http://localhost:9000/webchamberbucket/avatar/{user.user_id}/image.jpg'
