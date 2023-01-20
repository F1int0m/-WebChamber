from typing import Union

from aiohttp.web import HTTPBadRequest, HTTPOk
from aiohttp_pydantic import PydanticView
from aiohttp_pydantic.oas.typing import r200, r403
from common import context, errors
from common.db.models import Challenge, Post, PostAuthors
from common.enums import UserRoleEnum


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

        s3_filename = f'avatar/{user.user_id}/{file_name}'

        url = await minio_client.upload_file_from_request(request=self.request, s3_filename=s3_filename)

        await user.update_instance(avatar_link=url)

        return HTTPOk()


class PostDataHandler(PydanticView):

    async def post(self, post_id: str, file_name: str, /) -> Union[r200, r403]:
        """
        Метод для загрузки содержимого поста
        В теле нужны байтики аватарки, заранее валидной

        Status Codes:
            200: Успешно загрузилось
            400: Содержимое уже загружено
            403: Юзер не залогинен или не имеет доступа к посту
            404: Поста не найден

        Tags: file
        """
        user = context.user.get()
        minio_client = context.minio_client.get()

        post = await Post.get(post_id=post_id)

        if post.data_link:
            return HTTPBadRequest(text='Already exist')

        try:
            if user.role not in UserRoleEnum.admin_roles():
                await PostAuthors.get(post_id=post_id, user_id=user.user_id)
        except errors.DoesNotExists:
            raise errors.AccessDenied

        s3_filename = f'post/{post_id}/data/{file_name}'

        url = await minio_client.upload_file_from_request(request=self.request, s3_filename=s3_filename)
        await post.update_instance(data_link=url)

        return HTTPOk()


class PostPreviewHandler(PydanticView):

    async def post(self, post_id: str, file_name: str, /) -> Union[r200, r403]:
        """
        Метод для загрузки превью поста
        В теле нужны байтики аватарки, заранее валидной

        Status Codes:
            200: Успешно загрузилось
            400: Превью уже загружено
            403: Юзер не залогинен или не имеет доступа к посту
            404: Поста не найден

        Tags: file
        """
        user = context.user.get()
        minio_client = context.minio_client.get()

        post = await Post.get(post_id=post_id)

        if post.preview_link:
            return HTTPBadRequest(text='Already exist')

        try:
            if user.role not in UserRoleEnum.admin_roles():
                await PostAuthors.get(post_id=post_id, user_id=user.user_id)
        except errors.DoesNotExists:
            raise errors.AccessDenied

        s3_filename = f'post/{post_id}/preview/{file_name}'

        url = await minio_client.upload_file_from_request(request=self.request, s3_filename=s3_filename)
        await post.update_instance(preview_link=url)

        return HTTPOk()


class ChallengeDataHandler(PydanticView):

    async def post(self, challenge_id: str, file_name: str, /) -> Union[r200, r403]:
        """
        Метод для загрузки обложки на пост
        В теле нужны байтики обожки, заранее валидной

        Status Codes:
            200: Успешно загрузилось
            400: Содержимое уже загружено
            403: Юзер не залогинен или не имеет доступа к посту
            404: Челендж не найден

        Tags: file
        """
        user = context.user.get()
        minio_client = context.minio_client.get()

        challenge = await Challenge.get(challenge_id=challenge_id)

        if challenge.background_link:
            return HTTPBadRequest(text='Already exist')

        if user.role not in UserRoleEnum.admin_roles():
            raise errors.AccessDenied

        s3_filename = f'challenge/{challenge_id}/background/{file_name}'

        url = await minio_client.upload_file_from_request(request=self.request, s3_filename=s3_filename)
        await challenge.update_instance(background_link=url)

        return HTTPOk()
