from unittest.mock import ANY

from common.db.basic import manager
from common.db.models import Notification, User


async def test_notification__ok_when_subscribed(
        public_api_v1,
        user: User,
        notification_factory,
        user_factory
):
    user_to_subscribe = await user_factory()
    await notification_factory(user_to_create=user_to_subscribe)

    response = await public_api_v1(
        method='user_subscribe',
        user_id=user_to_subscribe.user_id,
    )
    assert response['result']

    notifications = await manager.execute(
        Notification.select(Notification).where(Notification.user_id == user_to_subscribe.user_id)
    )

    assert len(notifications) == 1
    assert notifications[0].to_dict() == {
        'is_seen': False,
        'notification_id': ANY,
        'notification_type': 'SUBSCRIBER',
        'object_id': user.user_id,
        'text': 'У вас новый подписчик',
        'user_id': user_to_subscribe.user_id}
