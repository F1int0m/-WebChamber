import pytest
from common.db.models import User
from common.enums import UserRole


async def test_user_get_self__ok(public_api_v1):
    response = await public_api_v1(method='user_get_self')
    assert response['result'] == {
        'avatar_link': None,
        'description': None,
        'mood_text': None,
        'nickname': 'test_user_nickname',
        'role': 'PLATFORM_OWNER',
        'user_id': 'test_id'
    }


async def test_user_get__ok(public_api_v1, user: User):
    response = await public_api_v1(method='user_get', user_id=user.user_id)
    assert response['result'] == {
        'avatar_link': None,
        'description': None,
        'mood_text': None,
        'nickname': 'test_user_nickname',
        'role': 'PLATFORM_OWNER',
        'user_id': 'test_id'
    }


async def test_user_get__error_unknown_user(public_api_v1):
    response = await public_api_v1(method='user_get', user_id='not a user id')
    assert response == {
        'error': {
            'code': 4002, 'data': 'User', 'message': 'User does not exists'
        },
        'id': 2,
        'jsonrpc': '2.0'
    }


@pytest.mark.parametrize('main_role,new_roles', [
    (
            UserRole.platform_owner,
            [
                UserRole.restricted,
                UserRole.active,
                UserRole.admin,
                UserRole.platform_owner,
            ],
    ),
    (
            UserRole.admin,
            [
                UserRole.restricted,
                UserRole.active,
                UserRole.admin,
            ],
    )
])
async def test_user_set_role__ok(public_api_v1, user: User, user_factory, main_role, new_roles):
    target_user = await user_factory(user_id='second user', nickname='abcd', role=UserRole.active)
    await user.update_instance(role=main_role)

    for role in new_roles:
        response = await public_api_v1(method='user_set_role', user_id=target_user.user_id, user_role=role)

        assert response['result']

        changed_user = await User.get(user_id=target_user.user_id)
        assert changed_user.role == role


@pytest.mark.parametrize('main_role,new_roles', [
    (
            UserRole.active,
            [
                UserRole.restricted,
                UserRole.active,
                UserRole.admin,
                UserRole.platform_owner,
            ],
    ),
    (
            UserRole.restricted,
            [
                UserRole.restricted,
                UserRole.active,
                UserRole.admin,
                UserRole.platform_owner
            ],
    ),
    (
            UserRole.admin,
            [
                UserRole.platform_owner
            ],
    ),
])
async def test_user_set_role__error_wrong_main_role(public_api_v1, user: User, user_factory, main_role, new_roles):
    old_role = UserRole.active
    target_user = await user_factory(user_id='second user', nickname='abcd', role=old_role)
    await user.update_instance(role=main_role)

    for role in new_roles:
        response = await public_api_v1(method='user_set_role', user_id=target_user.user_id, user_role=role)

        assert response['error'] == {'code': 4003, 'data': None, 'message': 'Access denied'}

        target_user = await User.get(user_id=target_user.user_id)
        assert target_user.role == old_role


async def test_user_edit__ok(public_api_v1, user:User):

    assert user.to_dict() == {}

    response = await public_api_v1(
        method='user_edit',
        mood_text='123321',
        description='description',
        nickname='new_nickname'
    )
    assert response == {'id': 2, 'jsonrpc': '2.0', 'result': True}

    user = await User.get()
    assert user.to_dict() == {}
