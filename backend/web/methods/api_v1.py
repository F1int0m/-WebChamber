from functools import partial
from logging import getLogger
from typing import List

from aiohttp import web
from common import context, enums, errors
from common.db.basic import manager
from common.db.models import Notification, Subscription, User, UserNotification
from common.models.response_models import (
    NotificationListResponse,
    PingResponse,
    SubscribersListResponse,
    UserListResponse,
    UserResponse,
)
from common.service import notification_service
from openrpc import RPCServer
from web.handlers.jsonrpc_handler import route

log = getLogger(__name__)

openrpc = RPCServer(title='WebChamber api')

route = partial(route, openrpc_instance=openrpc)


async def get_openrpc_doc(_: web.Request):
    return web.json_response(openrpc.discover())


@openrpc.method()
async def ping() -> PingResponse:
    return PingResponse()


@openrpc.method()
async def user_get_self() -> UserResponse:
    user = context.user.get()

    minio_client = context.minio_client.get()
    avatar_link = minio_client.get_user_avatar(user=user)

    return UserResponse(**user.to_dict(), avatar_link=avatar_link)


@openrpc.method()
async def user_get(user_id: str) -> UserResponse:
    user = await User.get(user_id=user_id)

    minio_client = context.minio_client.get()
    avatar_link = minio_client.get_user_avatar(user=user)

    return UserResponse(**user.to_dict(), avatar_link=avatar_link)


@openrpc.method()
async def user_set_role(user_id: str, user_role: enums.UserRoleEnum) -> bool:
    user = await User.get(user_id=user_id)
    current_user = context.user.get()

    if (
            user_role.is_less_or_equal_than(current_user.role) and
            current_user.role in [enums.UserRoleEnum.platform_owner, enums.UserRoleEnum.admin]
    ):
        await user.update_instance(role=user_role)
        return True

    raise errors.AccessDenied


@openrpc.method()
async def user_edit(nickname: str = None, mood_text: str = None, description: str = None) -> bool:
    user = context.user.get()

    return await user.update_instance(nickname=nickname, mood_text=mood_text, description=description)


@openrpc.method()
async def user_search(nickname_substring: str, page=1, limit=100) -> UserListResponse:
    users = await manager.execute(User.select().where(User.nickname.contains(nickname_substring)).paginate(page, limit))
    minio_client = context.minio_client.get()

    user_list = []
    for user in users:
        avatar_link = minio_client.get_user_avatar(user=user)

        user_list.append(UserResponse(**user.to_dict(), avatar_link=avatar_link))

    return UserListResponse(users=user_list)


@openrpc.method()
async def user_subscribers_list(user_id, page=1, limit=100) -> SubscribersListResponse:
    subscribers, total_count = await Subscription.get_subscribers(user_id=user_id, page=page, limit=limit)

    return SubscribersListResponse(subscribers=subscribers, total_subscribers_count=total_count)


@openrpc.method()
async def user_subscribe(user_id: str) -> bool:
    self_user = context.user.get()

    if self_user.user_id == user_id:
        raise errors.NoValidData("Can't subscribe yourself")

    params = {
        'main_user': user_id,
        'subscriber_user': self_user.user_id,
    }
    _, created = await manager.get_or_create(Subscription, defaults=params)

    await notification_service.create_notification(
        user_id=user_id,
        notification_type=enums.NotificationTypeEnum.subscriber,
        object_id=self_user.user_id
    )

    return created


@openrpc.method()
async def user_unsubscribe(user_id: str) -> bool:
    user = context.user.get()

    try:
        model = await Subscription.get(main_user=user.user_id, subscriber_user=user_id)
        await manager.delete(model)

    except errors.DoesNotExists:
        log.info('Already unsubscribed')
        return False

    return True


@openrpc.method()
async def user_notification_update(notification_list: List[enums.NotificationTypeEnum]) -> bool:
    user = context.user.get()

    await manager.execute(UserNotification.delete().where(UserNotification.user_id == user.user_id))

    for notification_type in notification_list:
        await UserNotification.create(user_id=user.user_id, notification_type=notification_type)

    return True


@openrpc.method()
async def user_notification_list(only_unwatched: bool = False, page=1, limit=100) -> NotificationListResponse:
    user = context.user.get()
    query = Notification.select().where(Notification.user_id == user.user_id).paginate(page, limit)

    if only_unwatched:
        query = query.where(~Notification.is_seen)

    notifications = [record.to_dict() for record in await manager.execute(query)]

    return NotificationListResponse(notifications=notifications)


@openrpc.method()
async def notification_mark_watched(notification_ids: List[str]) -> bool:
    return await notification_service.mark_watched(notification_ids=notification_ids, user=context.user.get())
