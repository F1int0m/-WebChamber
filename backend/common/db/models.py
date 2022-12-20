import logging
from typing import List, Tuple

from common import enums, utils
from common.db.basic import BaseModel, EnumField, manager
from playhouse.postgres_ext import (
    ArrayField,
    BooleanField,
    CharField,
    CompositeKey,
    DateTimeTZField,
    ForeignKeyField,
    TextField,
)

log = logging.getLogger('db_logger')


class CSRFToken(BaseModel):
    """Таблица для временного хранения CRFT токенов для авторизоника"""

    token = CharField(primary_key=True, default=utils.uuid_str)
    created_at = DateTimeTZField(default=utils.now_utc)


class User(BaseModel):
    """Таблица для хранения всей инфы о юзере """

    user_id = CharField(primary_key=True)
    role: enums.UserRoleEnum = EnumField(enum=enums.UserRoleEnum, default=enums.UserRoleEnum.active)
    nickname = CharField(unique=True)
    mood_text = CharField(null=True)
    description = CharField(null=True)

    avatar_link = CharField(help_text='Ссылка на аватарку пользователя', null=True)

    expires_at = DateTimeTZField(help_text='Время, до которого действует вк токен, то есть авторизация валидна')

    internal_token = CharField(
        unique=True,
        help_text='Токен, с которым пользователь может ходить к нам. Считаем вечным'
    )

    @staticmethod
    async def get_by_token(internal_access_token: str):
        return await User.get(internal_token=internal_access_token)

    def to_dict(self, extra_attrs: List = None):
        user_dict = super().to_dict()

        user_dict.pop('internal_token')
        user_dict.pop('expires_at')

        return user_dict


class Subscription(BaseModel):
    main_user = ForeignKeyField(User, help_text='Основной юзер')
    subscriber_user = ForeignKeyField(User, help_text='Подписчик')

    class Meta:
        primary_key = CompositeKey('main_user', 'subscriber_user')

    @classmethod
    async def get_subscribers(cls, user_id, page=1, limit=100) -> Tuple[List[User], int]:
        query = (
            Subscription.select(Subscription, User)
            .where(Subscription.main_user == user_id)
            .join(User, on=Subscription.subscriber_user)
            .paginate(page, limit)
        )

        subscribers: List[Subscription] = await manager.execute(query)
        subscribers_count = await manager.count(query=query, clear_limit=True)

        return [model.subscriber_user for model in subscribers], subscribers_count  # noqa


class UserNotification(BaseModel):
    user_id = ForeignKeyField(User)
    notification_type = EnumField(enums.NotificationTypeEnum)

    class Meta:
        primary_key = CompositeKey('user_id', 'notification_type')


class Notification(BaseModel):
    notification_id = CharField(primary_key=True, default=utils.uuid_str)
    user_id = ForeignKeyField(User)
    notification_type = EnumField(enums.NotificationTypeEnum)

    object_id = CharField(
        null=True,
        help_text=('Какой-то идентификатор какого-то обьекта, про который уведомление'
                   'ID нового подписчика, поста или челенджа')
    )

    is_seen = BooleanField(help_text='Прочитано уведомление или нет', default=False)
    text = TextField(help_text='Текст уведомления')


class Challenge(BaseModel):
    challenge_id = CharField(primary_key=True, default=utils.uuid_str)

    name = CharField()
    description = CharField()
    create_datetime = DateTimeTZField(default=utils.now_utc)
    end_datetime = DateTimeTZField()
    status = EnumField(enum=enums.ChallengeStatusEnum, default=enums.ChallengeStatusEnum.wait_for_review)

    background_link = CharField(null=True, help_text='Ссылка на обложку челленджа')


class Post(BaseModel):
    post_id = CharField(primary_key=True, default=utils.uuid_str)
    challenge_id = ForeignKeyField(Challenge, null=True, index=True)
    description = CharField()

    preview_link = CharField(help_text='Ссылка на превью поста', null=True)
    data_link = CharField(help_text='Ссылка на контент в посте. Может быть любая ссылка на любой источник', null=True)
    type = EnumField(enums.PostTypeEnum, default=enums.PostTypeEnum.platform)

    tags_list = ArrayField(field_class=CharField)

    is_reviewed = BooleanField(default=False)


class PostAuthors(BaseModel):
    post_id = ForeignKeyField(Post)
    user_id = ForeignKeyField(User)

    class Meta:
        primary_key = CompositeKey('post_id', 'user_id')


class UserLike(BaseModel):
    main_user_id = ForeignKeyField(User)
    user_who_like = ForeignKeyField(User)

    class Meta:
        primary_key = CompositeKey('main_user_id', 'user_who_like')


class ChallengeLike(BaseModel):
    challenge_id = ForeignKeyField(Challenge)
    user_id = ForeignKeyField(User)

    class Meta:
        primary_key = CompositeKey('challenge_id', 'user_id')


class PostLike(BaseModel):
    post_id = ForeignKeyField(Post)
    user_id = ForeignKeyField(User)

    class Meta:
        primary_key = CompositeKey('post_id', 'user_id')
