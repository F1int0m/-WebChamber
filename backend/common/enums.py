from enum import Enum


class UserRole(str, Enum):
    restricted = 'RESTRICTED'
    active = 'ACTIVE'
    admin = 'ADMIN'
    platform_owner = 'PLATFORM_OWNER'

    def is_less_or_equal_than(self, value_to_compare: 'UserRole'):
        enum_to_int = {
            UserRole.restricted: 1,
            UserRole.active: 2,
            UserRole.admin: 3,
            UserRole.platform_owner: 4,
        }
        self_int = enum_to_int[self]
        right_int = enum_to_int[value_to_compare]

        return self_int <= right_int
