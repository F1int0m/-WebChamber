import logging

from common import enums, utils
from common.db.basic import BaseModel, EnumField
from playhouse.postgres_ext import CharField, DateTimeTZField

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

    avatar_link = CharField(help_text='Ссылка на s3 хранилку, где будет лежать аватарка юзера', null=True)

    access_token = CharField(help_text='Токен для доступа к вк')
    expires_at = DateTimeTZField(help_text='Время, до которого действует вк токен, то есть авторизация валидна')

    internal_token = CharField(
        unique=True,
        help_text='Токен, с которым пользователь может ходить к нам. Считаем вечным'
    )

    @staticmethod
    async def get_by_token(internal_access_token: str):
        return await User.get(internal_token=internal_access_token)
