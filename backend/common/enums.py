from enum import Enum


class UserRoleEnum(str, Enum):
    restricted = 'RESTRICTED'
    active = 'ACTIVE'
    admin = 'ADMIN'
    platform_owner = 'PLATFORM_OWNER'

    @property
    def enum_to_int(self):
        return {
            UserRoleEnum.restricted: 1,
            UserRoleEnum.active: 2,
            UserRoleEnum.admin: 3,
            UserRoleEnum.platform_owner: 4,
        }

    def can_be_changed_by(self, current_role: 'UserRoleEnum'):
        if current_role == UserRoleEnum.restricted:
            return False

        self_int = self.enum_to_int[self]
        right_int = self.enum_to_int[current_role]

        return self_int <= right_int


class NotificationTypeEnum(str, Enum):
    subscriber = 'SUBSCRIBER'
    post = 'POST'
    challenge = 'CHALLENGE'
    status = 'STATUS'
    like = 'LIKE'


class ChallengeStatusEnum:
    deleted = 'DELETED'
    active = 'ACTIVE'
    done = 'DONE'
