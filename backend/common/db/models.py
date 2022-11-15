import logging
from typing import List

from peewee import CompositeKey

from common import enums, utils
from common.db.basic import BaseModel, EnumField, manager
from playhouse.postgres_ext import CharField, DateTimeTZField, ForeignKeyField, CompositeKey

log = logging.getLogger('db_logger')


class CSRFToken(BaseModel):
    """Таблица для временного хранения CRFT токенов для авторизоника"""

    token = CharField(primary_key=True, default=utils.uuid_str)
    created_at = DateTimeTZField(default=utils.now_utc)


class User(BaseModel):
    """Таблица для хранения всей инфы о юзере """

    user_id = CharField(primary_key=True)
    role = EnumField(enum=enums.UserRole, default=enums.UserRole.active)
    nickname = CharField(unique=True)
    mood_text = CharField(null=True)
    description = CharField(null=True)

    avatar_name = CharField(help_text='Название файла аватарки юзера', null=True)

    access_token = CharField(help_text='Токен для доступа к вк')
    expires_at = DateTimeTZField(help_text='Время, до которого действует вк токен, то есть авторизация валидна')

    internal_token = CharField(
        unique=True,
        help_text='Токен, с которым пользователь может ходить к нам. Считаем вечным'
    )

    @staticmethod
    async def get_by_token(internal_access_token: str):
        return await User.get(internal_token=internal_access_token)

    def to_dict(self):
        user_dict = super().to_dict()

        user_dict.pop('internal_token')
        user_dict.pop('access_token')
        user_dict.pop('expires_at')

        return user_dict


class Subscription(BaseModel):
    main_user = ForeignKeyField(User, help_text='Основной юзер')
    subscriber_user = ForeignKeyField(User, help_text='Подписчик')

    class Meta:
        primary_key = CompositeKey('main_user', 'subscriber_user')

    @classmethod
    async def get_subscribers(cls, user_id) -> List[str]:
        subscribers: List[Subscription] = await manager.execute(
            Subscription.select(Subscription,User)
            .where(Subscription.main_user == user_id)
            .join(User, on=Subscription.subscriber_user)
        )
        subscribers = list(subscribers)
        return [model.subscriber_user.user_id for model in subscribers]
