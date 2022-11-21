from functools import partial
from logging import getLogger

from aiohttp import web
from common import context, enums, errors
from common.db.basic import manager
from common.db.models import Subscription, User
from common.models.response_models import (
    PingResponse,
    SubscribersListResponse,
    UserResponse,
)
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
async def user_set_role(user_id: str, user_role: enums.UserRole) -> bool:
    user = await User.get(user_id=user_id)
    current_user = context.user.get()

    if (
            user_role.is_less_or_equal_than(current_user.role) and
            current_user.role in [enums.UserRole.platform_owner, enums.UserRole.admin]
    ):
        await user.update_instance(role=user_role)
        return True

    raise errors.AccessDenied


@openrpc.method()
async def user_edit(nickname: str = None, mood_text: str = None, description: str = None) -> bool:
    user = context.user.get()

    return await user.update_instance(nickname=nickname, mood_text=mood_text, description=description)


@openrpc.method()
async def user_subscribers_list(user_id) -> SubscribersListResponse:
    subscribers = await Subscription.get_subscribers(user_id=user_id)

    return SubscribersListResponse(subscribers=subscribers)


@openrpc.method()
async def user_subscribe(user_id: str) -> SubscribersListResponse:
    user = context.user.get()

    if user.user_id == user_id:
        raise errors.NoValidData("Can't subscribe yourself")

    params = {
        'main_user': user.user_id,
        'subscriber_user': user_id,
    }
    await manager.get_or_create(Subscription, defaults=params)

    # todo прикрутить уведомление

    new_subscribers = await Subscription.get_subscribers(user_id=user.user_id)

    return SubscribersListResponse(subscribers=new_subscribers)


@openrpc.method()
async def user_unsubscribe(user_id: str) -> SubscribersListResponse:
    user = context.user.get()

    try:
        model = await Subscription.get(main_user=user.user_id, subscriber_user=user_id)
        await manager.delete(model)

    except errors.DoesNotExists:
        log.info('Already unsubscribed')

    new_subscribers = await Subscription.get_subscribers(user_id=user.user_id)

    return SubscribersListResponse(subscribers=new_subscribers)
