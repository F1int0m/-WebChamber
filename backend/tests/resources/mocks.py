import pathlib

resources_path = pathlib.Path(__file__).parent / 'files'


def mock_vk_code_response_success():
    return {
        'access_token': 'test_token',
        'expires_in': 86399,
        'user_id': 1234567,
        'email': 'buguev.nikita@gmail.com'
    }


def mock_vk_code_response_error():
    return {
        'error': 'invalid_grant',
        'error_description': 'Code is expired.'
    }


def mock_avatar_file():
    with open(resources_path / 'avatar.jpeg', 'rb') as file:
        return file.read()
