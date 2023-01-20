from datetime import datetime
from typing import List

from common import errors
from common.db.basic import manager
from common.db.models import Challenge, ChallengeLike
from common.enums import ChallengeStatusEnum
from peewee import JOIN, fn

BASE_CHALLENGE_QUERY = Challenge.select(
    Challenge,
    fn.Count(ChallengeLike.challenge_id).alias('total_likes')
).join(
    ChallengeLike, JOIN.LEFT_OUTER
).group_by(
    Challenge
)


async def get_challenge_full(challenge_id) -> Challenge:
    query = BASE_CHALLENGE_QUERY.where(Challenge.challenge_id == challenge_id)
    result = list(await manager.execute(query))
    if len(result) == 0:
        raise errors.DoesNotExists(message=f'{Challenge.__name__} does not exists', data=Challenge.__name__)

    return result[0]


async def get_challenges_filtered_full(
        create_datetime: datetime = None,
        end_datetime: datetime = None,
        status: ChallengeStatusEnum = None,
        page: int = 1,
        limit: int = 100
) -> List[Challenge]:
    query = BASE_CHALLENGE_QUERY.paginate(page, limit)

    if create_datetime:
        query = query.where(Challenge.create_datetime > create_datetime).order_by(Challenge.create_datetime)

    if end_datetime:
        query = query.where(Challenge.end_datetime < end_datetime).order_by(Challenge.end_datetime)

    if status:
        query = query.where(Challenge.status == status)

    return await manager.execute(query)
