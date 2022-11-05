import os as os_package

PROJECT_DIR = os_package.path.dirname(os_package.path.dirname(os_package.path.abspath(__file__)))

HOST = '0.0.0.0'
PORT = '8080'

# Уровень логирования
# Один из DEBUG, INFO, WARNING, ERROR, CRITICAL
LOG_LEVEL = 'DEBUG'
