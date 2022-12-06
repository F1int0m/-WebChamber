from typing import List

from common import enums
from common.db.basic import manager
from common.db.models import Post, PostAuthors, PostLike
from peewee import JOIN, fn


async def get_posts_with_likes(
        user_id: str = None,
        challenge_id: str = None,
        tags: List[str] = None,
        post_type: enums.PostTypeEnum = None,
        page: int = 1,
        limit: int = 100
) -> List[Post]:
    """
    Возвращает список постов, обогащая его числов лайков за 1 запрос в базу

    Обогащает модельки полями likes_count и author_ids

    """
    query = Post.select(
        Post,
        fn.Count(PostLike.post_id).alias('likes_count'),
        fn.ARRAY_AGG(PostAuthors.user_id).alias('author_ids')
    ).join(
        PostLike, JOIN.LEFT_OUTER
    ).switch(
        Post
    ).join(
        PostAuthors
    ).group_by(
        Post
    ).paginate(
        page, limit
    )

    if user_id:
        # todo багулина, из-за этого в ответе возвращется только этот автор, хотя по факту авторов много
        query = query.where(PostAuthors.user_id == user_id)
    if challenge_id:
        query = query.where(Post.challenge_id == challenge_id)
    if tags:
        query = query.where(Post.tags_list.contains(tags))
    if post_type:
        query = query.where(Post.type == post_type)

    return await manager.execute(query)
