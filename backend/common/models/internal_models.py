import datetime
from typing import Optional

from common import utils
from pydantic import BaseModel, Field, root_validator


class VKOauthResponse(BaseModel):
    user_id: str = Field(...)
    email: Optional[str] = Field()

    access_token: str = Field(...)
    expires_at: datetime.datetime = Field(..., alias='expires_in')

    @root_validator
    def convert_seconds_to_correct_date(cls, values):
        seconds = int(values.get('expires_in', 0))
        values['expires_at'] = utils.now_utc() + datetime.timedelta(seconds=seconds)

        return values

    class Config:
        allow_population_by_field_name = True
