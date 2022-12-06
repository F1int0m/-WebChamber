from common import context
from common.db.basic import manager
from common.db.models import PostLike, UserLike


async def like_user(user_id: str):
    current_user = context.user.get()
    like, created = await manager.create_or_get(UserLike, main_user_id=current_user.user_id, user_who_like=user_id)

    return created


async def post_get_likes_count(post_id: str):
    result = await manager.count(PostLike.select().where(PostLike.post_id == post_id))
    return result


async def post_like(post_id: str):
    current_user = context.user.get()
    await manager.create_or_get(PostLike, user_id=current_user.user_id, post_id=post_id)

    return True


async def post_unlike(post_id: str):
    current_user = context.user.get()
    await manager.execute(
        PostLike.delete().where(
            (PostLike.post_id == post_id) &
            (PostLike.user_id == current_user.user_id)
        )
    )
    return True
