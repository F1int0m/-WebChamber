from typing import Any

from jsonrpcobjects.errors import ErrorObjectData, JSONRPCError


class BaseRPCError(JSONRPCError):
    code: int = None
    message: str = None
    http_status: int = 200

    def __init__(self, message: str = None, code: int = None, data: Any = None):
        code = code or self.code
        message = message or self.message
        error_obj = ErrorObjectData(code=code, message=message, data=data)
        super().__init__(error=error_obj)


class AlreadyExists(BaseRPCError):
    code = 4001
    message = 'Object already exists'


class DoesNotExists(BaseRPCError):
    code = 4002
    message = "Object doesn't exists"
    http_status = 404


class AccessDenied(BaseRPCError):
    code = 4003
    message = 'Access denied'
    http_status = 403  # только для части с REST, в jsonrpc не используется и отдается 200


class NoValidData(BaseRPCError):
    code = 4005
    message = 'Invalid data'


class VKOauthError(BaseRPCError):
    code = 5001
    message = 'VK oauth integration error'
    http_status = 400
