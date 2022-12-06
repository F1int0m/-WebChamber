from unittest.mock import ANY

import pytest
from common import enums
from common.db.basic import manager
from common.db.models import Notification, Subscription, User, UserNotification
from common.enums import UserRoleEnum


async def test_user_get_self__ok(public_api_v1, user: User):
    response = await public_api_v1(method='user_get_self')
    assert response['result'] == {
        'avatar_link': 'http://test.com/avatar.png',
        'description': 'description of user',
        'mood_text': 'mood',
        'nickname': user.nickname,
        'role': 'PLATFORM_OWNER',
        'user_id': user.user_id
    }


async def test_user_get__ok(public_api_v1, user: User):
    response = await public_api_v1(method='user_get', user_id=user.user_id)
    assert response['result'] == {
        'avatar_link': 'http://test.com/avatar.png',
        'description': 'description of user',
        'mood_text': 'mood',
        'nickname': user.nickname,
        'role': 'PLATFORM_OWNER',
        'user_id': user.user_id
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


async def test_user_search__ok(public_api_v1, user_factory):
    user = await user_factory(nickname='custom_name')
    response = await public_api_v1(
        method='user_search',
        nickname_substring='cust'
    )
    assert response['result'] == {
        'users': [
            {
                'avatar_link': 'http://test.com/avatar.png',
                'description': 'description of user',
                'mood_text': 'mood text of user',
                'nickname': 'custom_name',
                'role': 'PLATFORM_OWNER',
                'user_id': user.user_id
            }
        ]
    }


async def test_user_search__ok_empty(public_api_v1, user_factory):
    await user_factory(nickname='custom_name')
    response = await public_api_v1(
        method='user_search',
        nickname_substring='err4444'
    )
    assert response['result'] == {'users': []}


@pytest.mark.parametrize('main_role,new_roles', [
    (
        UserRoleEnum.platform_owner,
        [
            UserRoleEnum.restricted,
            UserRoleEnum.active,
            UserRoleEnum.admin,
            UserRoleEnum.platform_owner,
        ],
    ),
    (
        UserRoleEnum.admin,
        [
            UserRoleEnum.restricted,
            UserRoleEnum.active,
            UserRoleEnum.admin,
        ],
    )
])
async def test_user_set_role__ok(public_api_v1, user: User, user_factory, main_role, new_roles):
    target_user = await user_factory(user_id='second user', nickname='abcd', role=UserRoleEnum.active)
    await user.update_instance(role=main_role)

    for role in new_roles:
        response = await public_api_v1(method='user_set_role', user_id=target_user.user_id, user_role=role)

        assert response['result']

        changed_user = await User.get(user_id=target_user.user_id)
        assert changed_user.role == role


@pytest.mark.parametrize('main_role,new_roles', [
    (
        UserRoleEnum.active,
        [
            UserRoleEnum.restricted,
            UserRoleEnum.active,
            UserRoleEnum.admin,
            UserRoleEnum.platform_owner,
        ],
    ),
    (
        UserRoleEnum.restricted,
        [
            UserRoleEnum.restricted,
            UserRoleEnum.active,
            UserRoleEnum.admin,
            UserRoleEnum.platform_owner
        ],
    ),
    (
        UserRoleEnum.admin,
        [
            UserRoleEnum.platform_owner
        ],
    ),
])
async def test_user_set_role__error_wrong_main_role(public_api_v1, user: User, user_factory, main_role, new_roles):
    old_role = UserRoleEnum.active
    target_user = await user_factory(user_id='second user', nickname='abcd', role=old_role)
    await user.update_instance(role=main_role)

    for role in new_roles:
        response = await public_api_v1(method='user_set_role', user_id=target_user.user_id, user_role=role)

        assert response['error'] == {'code': 4003, 'data': None, 'message': 'Access denied'}

        target_user = await User.get(user_id=target_user.user_id)
        assert target_user.role == old_role


async def test_user_edit__ok(public_api_v1, user: User):
    assert user.to_dict() == {
        'avatar_link': 'http://test.com/avatar.png',
        'description': 'description of user',
        'mood_text': 'mood',
        'nickname': user.nickname,
        'role': 'PLATFORM_OWNER',
        'user_id': user.user_id
    }

    response = await public_api_v1(
        method='user_edit',
        mood_text='123321',
        description='description',
        nickname='new_nickname'
    )
    assert response == {'id': 2, 'jsonrpc': '2.0', 'result': True}

    user = await User.get()
    assert user.to_dict() == {
        'avatar_link': 'http://test.com/avatar.png',
        'description': 'description',
        'mood_text': '123321',
        'nickname': user.nickname,
        'role': 'PLATFORM_OWNER',
        'user_id': user.user_id
    }


async def test_user_subscribe__ok(public_api_v1, user: User, user_factory):
    user_second = await user_factory(user_id='second', nickname='123')
    response = await public_api_v1(
        method='user_subscribe',
        user_id=user_second.user_id
    )
    assert response == {
        'id': 2,
        'jsonrpc': '2.0',
        'result': True
    }

    subscribers, count = await Subscription.get_subscribers(user_id=user_second.user_id)
    assert count == len(subscribers) == 1

    assert subscribers[0].to_dict() == {
        'avatar_link': 'http://test.com/avatar.png',
        'description': 'description of user',
        'mood_text': user.mood_text,
        'nickname': user.nickname,
        'role': 'PLATFORM_OWNER',
        'user_id': user.user_id
    }


async def test_user_subscribe__error_subscribe_yourself(public_api_v1, user: User):
    response = await public_api_v1(
        method='user_subscribe',
        user_id=user.user_id
    )
    assert response == {
        'id': 2,
        'jsonrpc': '2.0',
        'error': {
            'code': 4005,
            'data': None,
            'message': "Can't subscribe yourself"
        },
    }


async def test_user_unsubscribe__ok(public_api_v1, user: User, user_factory, subscribes_factory):
    user_second = await user_factory(user_id='second', nickname='123')
    await subscribes_factory(user=user, subscribers=[user_second])

    response = await public_api_v1(
        method='user_unsubscribe',
        user_id=user_second.user_id
    )
    assert response == {
        'id': 2,
        'jsonrpc': '2.0',
        'result': True
    }
    subscribers, count = await Subscription.get_subscribers(user_id=user.user_id)
    assert count == len(subscribers) == 0


async def test_user_unsubscribe__ok_unsubscribe_yourself(public_api_v1, user: User):
    response = await public_api_v1(
        method='user_unsubscribe',
        user_id=user.user_id
    )
    assert response == {
        'id': 2,
        'jsonrpc': '2.0',
        'result': False
    }

    subscribers, count = await Subscription.get_subscribers(user_id=user.user_id)
    assert count == len(subscribers) == 0


async def test_user_subscribers_list__ok(public_api_v1, user: User, user_factory, subscribes_factory):
    user_second = await user_factory(user_id='second', nickname='123')
    user_third = await user_factory(user_id='third', nickname='321')
    await subscribes_factory(user=user, subscribers=[user_second, user_third])

    response = await public_api_v1(
        method='user_subscribers_list',
        user_id=user.user_id
    )
    assert response == {
        'id': 2,
        'jsonrpc': '2.0',
        'result': {
            'total_subscribers_count': 2,
            'subscribers': [
                {'avatar_link': 'http://test.com/avatar.png',
                 'description': 'description of user',
                 'mood_text': 'mood text of user',
                 'nickname': '123',
                 'role': 'PLATFORM_OWNER',
                 'user_id': 'second'},
                {'avatar_link': 'http://test.com/avatar.png',
                 'description': 'description of user',
                 'mood_text': 'mood text of user',
                 'nickname': '321',
                 'role': 'PLATFORM_OWNER',
                 'user_id': 'third'}
            ]
        }
    }


async def test_user_notification_update__ok(public_api_v1, user: User):
    notification_list = ['SUBSCRIBER', 'LIKE']

    response = await public_api_v1(
        method='user_notification_update',
        notification_list=notification_list
    )

    assert response['result']
    notifications = await manager.execute(
        UserNotification.select(UserNotification).where(UserNotification.user_id == user.user_id)
    )

    assert len(notifications) == 2

    for record in notifications:
        assert record.notification_type in notification_list


async def test_user_notification_list__ok_show_all(public_api_v1, user: User):
    await Notification.create(
        user_id=user.user_id,
        notification_type=enums.NotificationTypeEnum.subscriber,
        text='test_notification',
        is_seen=True,
    )
    await Notification.create(
        user_id=user.user_id,
        notification_type=enums.NotificationTypeEnum.like,
        text='test_notification'
    )
    response = await public_api_v1(
        method='user_notification_list',
    )

    assert response['result'] == {
        'notifications': [
            {
                'is_seen': True,
                'notification_id': ANY,
                'notification_type': 'SUBSCRIBER',
                'object_id': None,
                'text': 'test_notification'
            },
            {
                'is_seen': False,
                'notification_id': ANY,
                'notification_type': 'LIKE',
                'object_id': None,
                'text': 'test_notification'
            }
        ]
    }


async def test_user_notification_list__ok_show_only_unwatched(public_api_v1, user: User):
    await Notification.create(
        user_id=user.user_id,
        notification_type=enums.NotificationTypeEnum.subscriber,
        text='test_notification',
        is_seen=True,
    )
    await Notification.create(
        user_id=user.user_id,
        notification_type=enums.NotificationTypeEnum.like,
        text='test_notification'
    )
    response = await public_api_v1(
        method='user_notification_list',
        only_unwatched=True
    )

    assert response['result'] == {
        'notifications': [
            {
                'is_seen': False,
                'notification_id': ANY,
                'notification_type': 'LIKE',
                'object_id': None,
                'text': 'test_notification'
            }
        ]
    }


async def test_notification_mark_watched(public_api_v1, user: User):
    notification = await Notification.create(
        user_id=user.user_id,
        notification_type=enums.NotificationTypeEnum.subscriber,
        text='test_notification',
    )
    assert notification.to_dict() == {
        'is_seen': False,
        'notification_id': ANY,
        'notification_type': 'SUBSCRIBER',
        'object_id': None,
        'text': 'test_notification',
        'user_id': user.user_id
    }

    response = await public_api_v1(
        method='notification_mark_watched',
        notification_ids=[notification.notification_id]
    )

    assert response['result']
    new_notification = await Notification.get(notification_id=notification.notification_id)
    assert new_notification.to_dict() == {
        'is_seen': True,
        'notification_id': ANY,
        'notification_type': 'SUBSCRIBER',
        'object_id': None,
        'text': 'test_notification',
        'user_id': user.user_id
    }
