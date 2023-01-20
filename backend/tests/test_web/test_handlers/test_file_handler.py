from common.db.models import User
from common.enums import UserRoleEnum
from tests.resources import mocks


async def test_avatar_upload__ok(authorized_api_client, user: User):
    response = await authorized_api_client(url='/file/user-avatar/image.jpg', data=mocks.mock_avatar_file())
    assert response.status == 200

    user = await user.refresh()
    assert user.avatar_link == f'http://localhost:9000/webchamberbucket/avatar/{user.user_id}/image.jpg'


async def test_post_data_upload__ok(authorized_api_client, user: User, post_factory):
    post = await post_factory(fill_links=False)
    response = await authorized_api_client(
        url=f'/file/post-data/{post.post_id}/image.jpg',
        data=mocks.mock_avatar_file()
    )
    assert response.status == 200

    post = await post.refresh()
    assert post.data_link == f'http://localhost:9000/webchamberbucket/post/{post.post_id}/data/image.jpg'


async def test_post_data_upload__already_created(authorized_api_client, user: User, post_factory):
    post = await post_factory(fill_links=True)
    response = await authorized_api_client(
        url=f'/file/post-data/{post.post_id}/image.jpg',
        data=mocks.mock_avatar_file()
    )
    assert response.status == 400
    assert await response.text() == 'Already exist'


async def test_post_data_upload__error_other_user(authorized_api_client, user: User, post_factory, user_factory):
    user_2 = await user_factory()
    post = await post_factory(fill_links=False, author_ids=[user_2.user_id])

    await user.update_instance(role=UserRoleEnum.active)

    response = await authorized_api_client(
        url=f'/file/post-data/{post.post_id}/image.jpg',
        data=mocks.mock_avatar_file()
    )
    assert response.status == 403
    assert await response.json() == {'code': 4003, 'data': None, 'message': 'Access denied'}


async def test_post_data_upload__ok_admin_can_upload_any(authorized_api_client, user: User, post_factory, user_factory):
    user_2 = await user_factory()
    post = await post_factory(fill_links=False, author_ids=[user_2.user_id])

    response = await authorized_api_client(
        url=f'/file/post-data/{post.post_id}/image.jpg',
        data=mocks.mock_avatar_file()
    )
    assert response.status == 200


async def test_post_preview_upload__ok(authorized_api_client, user: User, post_factory):
    post = await post_factory(fill_links=False)
    response = await authorized_api_client(
        url=f'/file/post-preview/{post.post_id}/image.jpg',
        data=mocks.mock_avatar_file()
    )
    assert response.status == 200

    post = await post.refresh()
    assert post.preview_link == f'http://localhost:9000/webchamberbucket/post/{post.post_id}/preview/image.jpg'


async def test_challenge_background_upload__ok_admin(authorized_api_client, user: User, challenge_factory):
    challenge = await challenge_factory()

    response = await authorized_api_client(
        url=f'/file/challenge-background/{challenge.challenge_id}/image.jpg',
        data=mocks.mock_avatar_file()
    )
    assert response.status == 200

    challenge = await challenge.refresh()
    assert challenge.background_link == \
           f'http://localhost:9000/webchamberbucket/challenge/{challenge.challenge_id}/background/image.jpg'
