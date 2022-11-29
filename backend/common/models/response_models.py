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

    class Config:
        orm_mode = True


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
