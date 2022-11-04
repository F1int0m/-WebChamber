from secrets import token_urlsafe

import config


def create_access_token(min_size=config.TOKEN_MIN_SIZE):
    return token_urlsafe(min_size)
