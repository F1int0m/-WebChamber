import asyncio
import inspect
import logging
from time import sleep

from backend import config
import psycopg2

# from common.db import basic, models
from . import basic
from . import models

log = logging.getLogger('db.init')

tables = [
    x
    for _, x in inspect.getmembers(models, inspect.isclass)
    if issubclass(x, basic.BaseModel)
    and x
    not in [
        basic.BaseModel,
    ]
]


async def start():
    """
    Основная функция подключения к БД.

    Создает пул асинхронных коннектов
    """
    for i in range(10):
        try:
            basic.pg_db.init(
                database=config.DB_NAME,
                user=config.DB_USER,
                password=config.DB_PASS,
                host=config.DB_HOST,
                port=config.DB_PORT,
                max_connections=config.DB_MAX_CONNECTIONS,
                connection_timeout=float(config.DB_CONNECTION_TIMEOUT),
            )
            await basic.manager.connect()
        except (psycopg2.OperationalError, asyncio.TimeoutError):
            if i == 9:
                raise
            log.info('DB unavailable, just try another one')
            sleep(1)
            continue
        else:
            break
    create_tables()

    return basic.manager


async def close():
    """
    Закрывает соединение с базой и чистит пул

    """
    await basic.manager.close()


def create_tables():
    fixed_tables = [models.User, *tables]
    for table in fixed_tables:
        table.create_table()
