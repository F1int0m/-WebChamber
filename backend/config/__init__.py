# flake8: noqa
import ast
import http.client as http_client
import logging
import os as os_package
import sys

from .base import *

try:
    from .local import *
except ImportError:
    print('Not found local.py')

# Override config variables from environment
for var in list(locals()):
    value = os_package.getenv(var)
    if value is None:
        continue
    try:
        locals()[var] = ast.literal_eval(value)
    except:  # noqa
        locals()[var] = value

root = logging.getLogger()
root.setLevel(LOG_LEVEL)

handler = logging.StreamHandler(sys.stdout)
handler.setLevel(LOG_LEVEL)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
root.addHandler(handler)
