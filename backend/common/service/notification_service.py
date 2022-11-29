from logging import getLogger
from typing import List

from common import errors
from common.db.basic import manager
from common.db.models import Notification, User, UserNotification
from common.enums import NotificationTypeEnum

log = getLogger(__name__)


async def create_notification(
        user_id: str,
        notification_type: NotificationTypeEnum,
        object_id: str = None,
        **message_params
):
    try:
        await UserNotification.get(user_id=user_id, notification_type=notification_type)
    except errors.DoesNotExists:
        log.info(f'Notification for {user_id=} with {notification_type=} not found')
        return False

    await Notification.create(
        user_id=user_id,
        notification_type=notification_type,
        object_id=object_id,
        text=get_notification_text(notification_type=notification_type, **message_params)
    )


def get_notification_text(notification_type: NotificationTypeEnum, **message_params):
    message_converter = {
        NotificationTypeEnum.subscriber: 'У вас новый подписчик',
        NotificationTypeEnum.post: 'Новый пост',
        NotificationTypeEnum.challenge: 'Опубликован новый челлендж',
        NotificationTypeEnum.status: 'Вам изменили статус. Теперь ваш статус: %s'.format(**message_params),
        NotificationTypeEnum.like: 'Вам поставили лайк',
    }

    return message_converter[notification_type]


async def mark_watched(notification_ids: List[str], user: User) -> bool:
    await manager.execute(
        Notification.update({Notification.is_seen: True})
        .where(
            Notification.user_id == user.user_id and Notification.notification_id.in_(notification_ids)
        )
    )
    return True
