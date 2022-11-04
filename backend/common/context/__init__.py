"""
https://docs.python.org/3/library/contextvars.html
"""
import contextvars

from common.clients.vk_client import VKClient

x_request_id = contextvars.ContextVar('x_request_id')
request = contextvars.ContextVar('request')

vk_client: contextvars.ContextVar['VKClient'] = contextvars.ContextVar('vk_client')

app = contextvars.ContextVar('app')
