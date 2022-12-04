from io import BytesIO
from typing import Union

from aiohttp.web import HTTPOk
from aiohttp_pydantic import PydanticView
from aiohttp_pydantic.oas.typing import r200, r403
from common import context


class AvatarImageHandler(PydanticView):

    async def post(self, file_name: str, /) -> Union[r200, r403]:
        """
        Метод для загрузки аватарки текущему залогиненому юзеру.
        В теле нужны байтики аватарки, заранее валидной

        Status Codes:
            200: Успешно загрузилось
            403: Юзер не залогинен

        Tags: file
        """
        user = context.user.get()
        minio_client = context.minio_client.get()

        file_data = BytesIO(await self.request.content.read())

        await user.update_instance(avatar_name=file_name)

        minio_client.upload_file(file_data=file_data, file_name=f'avatar/{user.user_id}/{file_name}')

        return HTTPOk()
