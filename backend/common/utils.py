import datetime
import uuid

import pytz


def uuid_str():
    return str(uuid.uuid4())


def now_utc():
    return datetime.datetime.now(pytz.UTC)
