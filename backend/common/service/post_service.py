from typing import List

from common import enums, errors
from common.db.basic import manager
from common.db.models import Post, PostAuthors, PostLike
from peewee import JOIN, fn

BASE_POST_QUERY = Post.select(
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
)


async def get_posts_with_likes(
        user_id: str = None,
        challenge_id: str = None,
        tags: List[str] = None,
        post_type: enums.PostTypeEnum = None,
        only_reviewed: bool = False,
        page: int = 1,
        limit: int = 100
) -> List[Post]:
    """
    Возвращает список постов, обогащая его числом лайков за 1 запрос в базу

    Обогащает модельки полями likes_count и author_ids

    :param only_reviewed: Показывать только прошедшие модерацию посты
    """
    query = BASE_POST_QUERY.paginate(page, limit)

    if user_id:
        # todo багулина, из-за этого в ответе возвращется только этот автор, хотя по факту авторов много
        query = query.where(PostAuthors.user_id == user_id)
    if challenge_id:
        query = query.where(Post.challenge_id == challenge_id)
    if tags:
        query = query.where(Post.tags_list.contains(tags))
    if post_type:
        query = query.where(Post.type == post_type)
    if only_reviewed:
        query = query.where(Post.is_reviewed == only_reviewed)

    return await manager.execute(query)


async def get_single_post_full(
        post_id: str
) -> Post:
    """
    Возвращает конкретный пост, обогащая его числов лайков за 1 запрос в базу

    Обогащает модельку полями likes_count и author_ids

    """
    query = BASE_POST_QUERY.where(Post.post_id == post_id)
    result = list(await manager.execute(query))
    if len(result) == 0:
        raise errors.DoesNotExists(message=f'{Post.__name__} does not exists', data=Post.__name__)

    return result[0]
