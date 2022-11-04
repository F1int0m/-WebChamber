import os as os_package

PROJECT_DIR = os_package.path.dirname(os_package.path.dirname(os_package.path.abspath(__file__)))

HOST = '0.0.0.0'
PORT = '8080'
SELF_DOMAIN = 'https://212.220.113.111'

DB_NAME = 'webchamber'
DB_USER = 'webchamber'
DB_PASS = 'change'
DB_HOST = 'localhost'
DB_PORT = 5432
DB_CONNECTION_TIMEOUT = 10
DB_MAX_CONNECTIONS = 20

# Уровень логирования
# Один из DEBUG, INFO, WARNING, ERROR, CRITICAL
LOG_LEVEL = 'DEBUG'

VK_OAUTH_URL = 'https://oauth.vk.com'
VK_AUTHORIZE_URL = 'https://oauth.vk.com/authorize'

VK_CLIENT_ID = '123'
VK_CLIENT_SECRET = '123'

VK_REDIRECT_URI = 'http://212.220.113.111/auth/vk/code_response'
VK_SCOPE = 'email'

FRONTEND_FINISH_AUTH_URL = 'http://212.220.113.111/'
TOKEN_COOKIE_NAME = 'webchamber_token'
TOKEN_MIN_SIZE = 15
