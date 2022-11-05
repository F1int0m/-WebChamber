from pydantic import BaseModel, Field


class PingResponse(BaseModel):
    text: str = Field(default='pong!')
