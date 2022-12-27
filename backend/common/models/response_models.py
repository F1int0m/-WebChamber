import datetime
from typing import List, Optional

from common import enums
from common.db.models import User
from pydantic import AnyUrl, BaseModel, Field, validator


class PingResponse(BaseModel):
    text: str = Field(default='pong!')


class UserResponse(BaseModel):
    user_id: str = Field(...)
    role: enums.UserRoleEnum = Field(..., title='Роль юзера в системе, влияет на доступ')
    nickname: str = Field(..., title='Уникальное имя пользователя')
    mood_text: Optional[str] = Field(title='Небольшой статус у юзера')
    description: Optional[str] = Field(title='Описание юзера')
    avatar_link: Optional[AnyUrl] = Field(title='Ссылка для загрузки аватарки')


class UserListResponse(BaseModel):
    users: List[UserResponse]


class SubscribersListResponse(BaseModel):
    subscribers: List[UserResponse] = Field(..., title='Список пользователей')
    total_subscribers_count: int = Field(..., title='Общее число подписчиков')

    @validator('subscribers', pre=True)
    def convert_users(cls, value: List[User]):
        return [user.to_dict() for user in value]


class Notification(BaseModel):
    notification_id: str = Field(..., title='id конкретного уведомления')
    notification_type: enums.NotificationTypeEnum = Field(..., title=' Тип уведомления')
    object_id: Optional[str] = Field(
        title=(
            'Какой-то идентификатор какого-то обьекта, про который уведомление'
            'ID нового подписчика, поста или челенджа'
        )
    )
    is_seen: bool = Field(title='Прочитано уведомление или нет')
    text: str = Field(title='Текст уведомления')


class NotificationListResponse(BaseModel):
    notifications: List[Notification]


class PostResponse(BaseModel):
    post_id: str = Field(...)
    challenge_id: Optional[str] = Field()

    author_ids: List[str] = Field(...)

    description: str = Field(...)

    preview_link: Optional[AnyUrl] = Field(description='Ссылка на превью поста')
    data_link: Optional[AnyUrl] = Field(description='Ссылка на содержимое поста')
    type: enums.PostTypeEnum = Field(...)

    tags_list: List[str] = Field(...)

    likes_count: int = Field(...)

    is_reviewed: bool = Field(...)


class PostListResponse(BaseModel):
    posts: List[PostResponse]


class ChallengeResponse(BaseModel):
    challenge_id: str = Field(...)

    name: str = Field(...)
    description: str = Field(...)
    create_datetime: datetime.datetime = Field(..., example='')  # todo дописать пример даты
    end_datetime: datetime.datetime = Field(..., example='')
    status: enums.ChallengeStatusEnum = Field(...)

    background_link: Optional[AnyUrl] = Field()

    total_likes: int = Field(..., description='Суммарное количество лайков со всех постов в челендже')


class ChallengeListResponse(BaseModel):
    challenges: List[ChallengeResponse]
