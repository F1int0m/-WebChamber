def mock_vk_code_response_success():
    return {
        'access_token': '533bacf01e11f55b536a565b57531ac114461ae8736d6506a3',
        'expires_in': 86399,
        'user_id': 1234567,
        'email': 'buguev.nikita@gmail.com'
    }


def mock_vk_code_response_error():
    return {
        'error': 'invalid_grant',
        'error_description': 'Code is expired.'
    }
