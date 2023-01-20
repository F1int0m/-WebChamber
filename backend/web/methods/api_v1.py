import datetime
from functools import partial
from logging import getLogger
from typing import List

import config
from aiohttp import web
from common import context, enums, errors
from common.db.basic import manager
from common.db.models import (
    Challenge,
    Notification,
    Post,
    PostAuthors,
    Subscription,
    User,
    UserNotification,
)
from common.models.request_models import ExternalPostData
from common.models.response_models import (
    ChallengeListResponse,
    ChallengeResponse,
    NotificationListResponse,
    PingResponse,
    PostListResponse,
    PostResponse,
    SubscribersListResponse,
    UserListResponse,
    UserResponse,
)
from common.service import (
    challenge_service,
    like_service,
    notification_service,
    post_service,
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

    return UserResponse(**user.to_dict())


@openrpc.method()
async def user_get(user_id: str) -> UserResponse:
    user = await User.get(user_id=user_id)

    return UserResponse(**user.to_dict())


@openrpc.method()
async def user_set_role(user_id: str, user_role: enums.UserRoleEnum) -> bool:
    user = await User.get(user_id=user_id)
    current_user = context.user.get()

    if (
            user_role.can_be_changed_by(current_user.role) and
            current_user.role in [enums.UserRoleEnum.platform_owner, enums.UserRoleEnum.admin]
    ):
        await user.update_instance(role=user_role)
        return True

    raise errors.AccessDenied


@openrpc.method()
async def user_edit(nickname: str = None, mood_text: str = None, description: str = None) -> bool:
    user = context.user.get()
    data = {
        'nickname': nickname,
        'mood_text': mood_text,
        'description': description,
    }
    data_to_update = {key: value for key, value in data.items() if value}

    return await user.update_instance(**data_to_update)


@openrpc.method()
async def user_search(nickname_substring: str, page=1, limit=100) -> UserListResponse:
    users = await manager.execute(User.select().where(User.nickname.contains(nickname_substring)).paginate(page, limit))

    return UserListResponse(users=[user.to_dict() for user in users])


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


# Посты
@openrpc.method()
async def post_create(
        description: str,
        tags_list: List[str] = None,
        external_data: ExternalPostData = None,
        additional_authors_ids: List[str] = None,
        challenge_id: str = None

) -> PostResponse:
    user = context.user.get()
    if user.role == enums.UserRoleEnum.restricted:
        raise errors.AccessDenied

    params = {
        'challenge_id': challenge_id,
        'description': description,
        'tags_list': tags_list or []
    }
    if external_data:
        params.update({
            'preview_link': external_data.external_preview_link,
            'data_link': external_data.external_data_link,
            'type': enums.PostTypeEnum.external
        })

    post = await Post.create(**params)

    author_ids = [user.user_id]
    if additional_authors_ids:
        author_ids.extend(additional_authors_ids)

    for user_id in author_ids:
        await PostAuthors.create(post_id=post.post_id, user_id=user_id)

    return PostResponse(**post.to_dict(), author_ids=author_ids, likes_count=0)


@openrpc.method()
async def post_get(post_id: str) -> PostResponse:
    post = await Post.get(post_id=post_id)

    authors = await manager.execute(
        PostAuthors.select(PostAuthors, User).join(User).where(PostAuthors.post_id == post_id)
    )

    author_ids = [author.user_id.user_id for author in authors]

    return PostResponse(
        **post.to_dict(),
        author_ids=author_ids,
        likes_count=await like_service.post_get_likes_count(post_id)
    )


@openrpc.method()
async def post_like(post_id: str) -> bool:
    return await like_service.post_like(post_id)


@openrpc.method()
async def post_unlike(post_id: str) -> bool:
    return await like_service.post_unlike(post_id)


@openrpc.method()
async def post_filtered_list(
        user_id: str = None,
        challenge_id: str = None,
        tags: List[str] = None,
        post_type: enums.PostTypeEnum = None,
        only_reviewed: bool = False,
        page: int = 1,
        limit: int = 100
) -> PostListResponse:
    posts_raw = await post_service.get_posts_with_likes(
        user_id=user_id,
        challenge_id=challenge_id,
        tags=tags,
        post_type=post_type,
        only_reviewed=only_reviewed,
        page=page,
        limit=limit
    )
    return PostListResponse(posts=[post.to_dict(extra_attrs=['likes_count', 'author_ids']) for post in posts_raw])


@openrpc.method()
async def post_set_reviewed_status(post_id: str, status: bool) -> PostResponse:
    user = context.user.get()
    if user.role not in enums.UserRoleEnum.admin_roles():
        raise errors.AccessDenied

    post = await Post.get(post_id=post_id)

    await post.update_instance(is_reviewed=status)

    post = await post_service.get_single_post_full(post_id=post_id)

    return PostResponse(**post.to_dict(extra_attrs=['likes_count', 'author_ids']))


@openrpc.method(description='Время в формате:"DD-MM-YYYY HH:MM:SS"')
async def challenge_create(
        name: str,
        description: str,
        end_datetime: str
) -> ChallengeResponse:
    user = context.user.get()
    if user.role not in enums.UserRoleEnum.admin_roles():
        raise errors.AccessDenied

    end_datetime = datetime.datetime.strptime(end_datetime, config.DATETIME_FORMAT)

    challenge = await Challenge.create(
        name=name,
        description=description,
        end_datetime=end_datetime
    )

    response_challenge = await challenge_service.get_challenge_full(challenge_id=challenge.challenge_id)
    return ChallengeResponse(**response_challenge.to_dict(extra_attrs=['total_likes']))


@openrpc.method()
async def challenge_get(challenge_id: str) -> ChallengeResponse:
    challenge = await challenge_service.get_challenge_full(challenge_id=challenge_id)

    return ChallengeResponse(**challenge.to_dict(extra_attrs=['total_likes']))


@openrpc.method(
    description=('Время в формате:"DD-MM-YYYY HH:MM:SS". '
                 'При указании create_datetime возвращает все челленджи, созданные после этой даты. '
                 'При указании end_datetime - все челленджи созданные до этой даты')
)
async def challenge_filtered_list(
        create_datetime: str = None,
        end_datetime: str = None,
        status: enums.ChallengeStatusEnum = None,
        page: int = 1,
        limit: int = 100
) -> ChallengeListResponse:
    if create_datetime:
        create_datetime = datetime.datetime.strptime(create_datetime, config.DATETIME_FORMAT)

    if end_datetime:
        end_datetime = datetime.datetime.strptime(end_datetime, config.DATETIME_FORMAT)

    challenges = await challenge_service.get_challenges_filtered_full(
        create_datetime=create_datetime,
        end_datetime=end_datetime,
        status=status,
        page=page,
        limit=limit
    )
    return ChallengeListResponse(
        challenges=[challenge.to_dict(extra_attrs=['total_likes']) for challenge in challenges]
    )


@openrpc.method()
async def challenge_edit(
        challenge_id: str,
        name: str = None,
        description: str = None,
        end_datetime: str = None,
        status: enums.ChallengeStatusEnum = None,
) -> ChallengeResponse:
    user = context.user.get()
    if user.role not in enums.UserRoleEnum.admin_roles():
        raise errors.AccessDenied

    challenge = await challenge_service.get_challenge_full(challenge_id=challenge_id)

    if end_datetime:
        end_datetime = datetime.datetime.strptime(end_datetime, config.DATETIME_FORMAT)

    data = {
        'name': name,
        'description': description,
        'end_datetime': end_datetime,
        'status': status
    }
    data_to_update = {key: value for key, value in data.items() if value}
    await challenge.update_instance(**data_to_update)

    return ChallengeResponse(**challenge.to_dict(extra_attrs=['total_likes']))
