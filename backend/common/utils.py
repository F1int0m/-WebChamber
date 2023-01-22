import datetime
import uuid

import pytz


def uuid_str():
    return str(uuid.uuid4())


def now_utc():
    return datetime.datetime.now(pytz.UTC)


def parse_datetime(datetime_string: str) -> datetime.datetime:
    return datetime.datetime.fromisoformat(datetime_string)


def convert_to_iso_8601_with_z_suffix(dt: datetime) -> str:
    return dt.strftime('%Y-%m-%dT%H:%M:%SZ')


def create_default_nickname():
    return f'WebChamber_user_{uuid_str()}'
