from enum import Enum
from typing import List

from aiohttp import web
from openrpc import RPCServer
from pydantic import BaseModel, Field


# models
class CustomEnum(str, Enum):
    admin = 'ADMIN'
    user = 'USER'


class ChildModel(BaseModel):
    enum_field: CustomEnum = Field(..., title='something')


class ParentModel(BaseModel):
    list_of_child: List[ChildModel] = Field(..., title='something again')


# openrpc server
rpc = RPCServer(title='Demo Server', version='1.0.0')


@rpc.method
def func_for_test() -> ParentModel:
    return ParentModel(list_of_child=[ChildModel(enum_field=CustomEnum.admin)])


# http server

async def get_openrpc_doc(_: web.Request):
    return web.json_response(rpc.discover())


application = web.Application()
application.router.add_route('GET', '/docs/openrpc.json', get_openrpc_doc)
web.run_app(app=application, host='0.0.0.0', port=8080)
