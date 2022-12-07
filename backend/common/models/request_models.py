from typing import Optional

from pydantic import BaseModel, Field


class ExternalPostData(BaseModel):
    external_data_link: str = Field(..., description='Ссылка на контент')
    external_preview_link: Optional[str] = Field(description='Ссылка на превью')
