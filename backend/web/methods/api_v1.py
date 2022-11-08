from functools import partial

from aiohttp import web
from common import context, enums, errors
from common.db.models import User
from common.models.response_models import PingResponse, UserResponse
from openrpc import RPCServer
from web.handlers.jsonrpc_handler import route

openrpc = RPCServer(title='WebChamber api')

route = partial(route, openrpc_instance=openrpc)


async def get_openrpc_doc(_: web.Request):
    return web.json_response(openrpc.discover())


@openrpc.method()
async def ping() -> PingResponse:
    return PingResponse()


@openrpc.method()
async def user_get_self() -> UserResponse:
    user = context.user.get()
    return UserResponse(**user.to_dict())


@openrpc.method()
async def user_get(user_id: str) -> UserResponse:
    user = await User.get(user_id=user_id)
    return UserResponse(**user.to_dict())


@openrpc.method()
async def user_set_role(user_id: str, user_role: enums.UserRole) -> bool:
    user = await User.get(user_id=user_id)
    current_user = context.user.get()

    if (
            user_role.is_less_or_equal_than(current_user.role) and
            current_user.role in [enums.UserRole.platform_owner, enums.UserRole.admin]
    ):
        await user.update_instance(role=user_role)
        return True

    raise errors.AccessDenied


@openrpc.method()
async def user_edit(nickname: str = None, mood_text: str = None, description: str = None) -> bool:
    user = context.user.get()

    return await user.update_instance(nickname=nickname, mood_text=mood_text, description=description)
