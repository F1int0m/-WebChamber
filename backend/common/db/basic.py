import logging
from typing import List

from common import errors
from peewee import DoesNotExist, IntegrityError
from peewee_async import Manager, PooledPostgresqlDatabase
from playhouse.postgres_ext import CharField, Model
from playhouse.shortcuts import model_to_dict

__all__ = ['pg_db', 'manager', 'BaseModel', 'EnumField', ]

log = logging.getLogger('db_logger')


class PooledPGDatabase(PooledPostgresqlDatabase):

    def init(self, database, **kwargs):
        super().init(database, **kwargs)
        self.init_async()


pg_db = PooledPGDatabase(None)
manager = Manager(pg_db)


class BaseModel(Model):
    """
    Базовая модель с переопределенными функциями для удобства.
    """

    class Meta:
        database = pg_db

    def __repr__(self):
        return f'{self.__class__.__name__}:{self._get_pk_value()}'

    def to_dict(self, extra_attrs: List = None):
        return model_to_dict(self, recurse=False, extra_attrs=extra_attrs)

    def is_changed(self, **kwargs):
        for name, value in kwargs.items():
            current_value = getattr(self, name)
            if current_value != value:
                return True
        return False

    async def update_instance(self, **params):
        """
        Функция обновления модели с проверкой надо ли обновлять в базе

        Returns:
            True/False в зависимости от того обновлялась ли модель в базе
        """
        new_params = {fld: val for fld, val in params.items() if fld in self._meta.fields}
        changed = self.is_changed(**new_params)
        if changed:
            for fld, value in new_params.items():
                setattr(self, fld, value)
            await manager.update(self)
        return changed

    @classmethod
    async def create(cls, **kwargs) -> 'BaseModel':
        async with manager.atomic():
            try:
                return await manager.create(cls, **kwargs)
            except IntegrityError as exc:
                raise errors.AlreadyExists(data=cls.__name__, message=exc.orig.diag.message_detail)

    @classmethod
    async def get(cls, *args, **kwargs) -> 'BaseModel':
        try:
            return await manager.get(cls, *args, **kwargs)
        except DoesNotExist:
            raise errors.DoesNotExists(message=f'{cls.__name__} does not exists', data=cls.__name__)

    async def refresh(self):
        return await type(self).get(self._pk_expr())


class EnumField(CharField):
    """
    Поле для хранения enum в БД.
    Хранит в базе строки, а в коде enum.
    """

    def __init__(self, enum, **kwargs):
        self._enum = enum
        self.value = None
        super().__init__(**kwargs)

    def db_value(self, value):
        assert type(value) == self._enum, f'Enum object {self._enum} expected, {type(value)} given'
        value = self._enum(value)
        return str(value.value)

    def python_value(self, value):
        return self._enum(value)
