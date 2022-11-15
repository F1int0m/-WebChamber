from typing import Optional, List

from common import enums
from pydantic import AnyUrl, BaseModel, Field


class PingResponse(BaseModel):
    text: str = Field(default='pong!')


class UserResponse(BaseModel):
    user_id: str = Field(...)
    role: enums.UserRole = Field(..., title='Роль юзера в системе, влияет на доступ')
    nickname: str = Field(..., title='Уникальное имя пользователя')
    mood_text: Optional[str] = Field(title='Небольшой статус у юзера')
    description: Optional[str] = Field(title='Описание юзера')
    avatar_link: Optional[AnyUrl] = Field(title='Ссылка для загрузки аватарки')


class SubscribersListResponse(BaseModel):
    subscribers: List[str] = Field(..., title='Список id пользователей')
