from io import BytesIO

import config
from aiohttp.web import Request
from minio import Minio


class MinioClient:
    bucket = config.MINIO_BUCKET
    client: Minio

    def __init__(self):
        self.client = Minio(
            endpoint=config.MINIO_ENDPOINT,
            secure=False,
            access_key=config.MINIO_ROOT_USER,
            secret_key=config.MINIO_ROOT_PASSWORD,
        )

    def upload_file(self, file_data, file_name: str, mime_type='image/jpg'):
        result = self.client.put_object(
            bucket_name=self.bucket,
            object_name=file_name,
            content_type=mime_type,
            data=file_data,
            length=-1,
            part_size=10 * 1024 * 1024
        )
        return result

    async def upload_file_from_request(self, request: Request, s3_filename: str):
        file_data = BytesIO(await request.content.read())
        content_type = request.headers.get('Content-Type', '')

        self.upload_file(file_data=file_data, file_name=s3_filename, mime_type=content_type)

        return f'{config.MINIO_USER_ENDPOINT}/{config.MINIO_BUCKET}/{s3_filename}'
