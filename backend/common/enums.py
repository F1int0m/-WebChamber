from enum import Enum


class UserRoleEnum(str, Enum):
    restricted = 'RESTRICTED'
    active = 'ACTIVE'
    admin = 'ADMIN'
    platform_owner = 'PLATFORM_OWNER'

    def is_less_or_equal_than(self, value_to_compare: 'UserRoleEnum'):
        enum_to_int = {
            UserRoleEnum.restricted: 1,
            UserRoleEnum.active: 2,
            UserRoleEnum.admin: 3,
            UserRoleEnum.platform_owner: 4,
        }
        self_int = enum_to_int[self]
        right_int = enum_to_int[value_to_compare]

        return self_int <= right_int


class NotificationTypeEnum(str, Enum):
    subscriber = 'SUBSCRIBER'
    post = 'POST'
    challenge = 'CHALLENGE'
    status = 'STATUS'
    like = 'LIKE'
