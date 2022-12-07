from datetime import timedelta

import config
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

    def get_download_link(self, file_path: str) -> str:
        url = self.client.presigned_get_object(
            bucket_name=self.bucket,
            object_name=file_path,
            expires=timedelta(hours=2),
        )
        return url
