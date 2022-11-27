from typing import List, Optional

from common import enums
from common.db.models import User
from pydantic import AnyUrl, BaseModel, Field, validator


class PingResponse(BaseModel):
    text: str = Field(default='pong!')


class UserResponse(BaseModel):
    user_id: str = Field(...)
    role: enums.UserRole = Field(..., description='Роль юзера в системе, влияет на доступ')
    nickname: str = Field(..., description='Уникальное имя пользователя')
    mood_text: Optional[str] = Field(description='Небольшой статус у юзера')
    description: Optional[str] = Field(description='Описание юзера')
    avatar_link: Optional[AnyUrl] = Field(description='Ссылка для загрузки аватарки')


class SubscribersListResponse(BaseModel):
    subscribers: List[UserResponse] = Field(..., description='Список id пользователей')
    total_subscribers_count: int = Field(..., description='Общее число подписчиков')

    @validator('subscribers', pre=True)
    def convert_users(cls, value: List[User]):
        return [user.to_dict() for user in value]
