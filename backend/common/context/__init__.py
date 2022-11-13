"""
https://docs.python.org/3/library/contextvars.html
"""
import contextvars

from common.clients.minio_cient import MinioClient
from common.clients.vk_client import VKClient
from common.db.models import User

x_request_id = contextvars.ContextVar('x_request_id')
request = contextvars.ContextVar('request')

vk_client: contextvars.ContextVar['VKClient'] = contextvars.ContextVar('vk_client')
minio_client: contextvars.ContextVar['MinioClient'] = contextvars.ContextVar('minio_client')

user: contextvars.ContextVar['User'] = contextvars.ContextVar('user')

app = contextvars.ContextVar('app')
