from unittest.mock import ANY

from common import enums
from common.db.basic import manager
from common.db.models import PostLike, User
from pytest import mark


async def test_post_create__ok(public_api_v1, user: User, user_factory):
    other_user_1 = await user_factory()
    other_user_2 = await user_factory()
    response = await public_api_v1(
        'post_create',
        description='test post',
        additional_authors_ids=[other_user_1.user_id, other_user_2.user_id],
        tags_list=['test', 'new_tag'],
        external_data={'external_data_link': 'https://test.com'}
    )
    assert response['result'] == {
        'author_ids': ANY,
        'challenge_id': None,
        'data_link': 'https://test.com',
        'description': 'test post',
        'type': 'EXTERNAL',
        'likes_count': 0,
        'post_id': ANY,
        'preview_link': None,
        'is_reviewed': False,
        'tags_list': ['test', 'new_tag']
    }

    assert sorted(response['result']['author_ids']) == sorted(
        [user.user_id, other_user_1.user_id, other_user_2.user_id])


@mark.parametrize('extended_data, expected_error', [
    (
        {'additional_authors_ids': [123321]},
        {
            'code': 4001,
            'data': 'PostAuthors',
            'message': 'Key (user_id)=(123321) is not present in table "user".'
        }
    ),
    (
        {'challenge_id': 123321},
        {
            'code': 4001,
            'data': 'Post',
            'message': 'Key (challenge_id)=(123321) is not present in table "challenge".'
        }
    ),
    # todo очень странная фигня, возможно либа для openrpc полное говно
    (
        {'external_data': {'external_preview_link': 'https://test.com'}},
        {
            'code': -32603,
            'data': "Failed to deserialize request param [{'external_preview_link': "
            "'https://test.com'}] to type "
            '[typing.Optional[common.models.request_models.ExternalPostData]]',
            'message': 'Internal error'
        }
    )
])
async def test_post_create__error_unknown_foreign_object(public_api_v1, user: User, extended_data, expected_error):
    response = await public_api_v1(
        'post_create',
        description='test post',
        **extended_data
    )
    assert response['error'] == expected_error


async def test_post_create__error_restricted_user(public_api_v1, user: User):
    await user.update_instance(role=enums.UserRoleEnum.restricted)

    response = await public_api_v1(
        'post_create',
        description='test post',
    )
    assert response['error'] == {'code': 4003, 'data': None, 'message': 'Access denied'}


async def test_post_get__ok(public_api_v1, post_factory, user: User):
    post = await post_factory()
    response = await public_api_v1(
        'post_get',
        post_id=post.post_id,
    )
    assert response['result'] == {
        'author_ids': [user.user_id],
        'challenge_id': None,
        'data_link': 'http://test.com/data',
        'description': 'description of user',
        'type': 'PLATFORM',
        'likes_count': 0,
        'post_id': post.post_id,
        'is_reviewed': True,
        'preview_link': 'http://test.com',
        'tags_list': ['tag']
    }


async def test_post_get__error_unknown(public_api_v1):
    response = await public_api_v1(
        'post_get',
        post_id='123321',
    )
    assert response['error'] == {'code': 4002, 'data': 'Post', 'message': 'Post does not exists'}


async def test_post_like__ok(public_api_v1, post_factory, user: User, user_factory):
    post = await post_factory()

    likes = await manager.count(PostLike.select(PostLike.post_id == post.post_id))
    assert likes == 0

    for i in range(5):
        user_for_like = await user_factory()
        response = await public_api_v1(
            'post_like',
            user=user_for_like,
            post_id=post.post_id,
        )
        assert response['result']

    likes = await manager.count(PostLike.select(PostLike.post_id == post.post_id))
    assert likes == 5

    response = await public_api_v1(
        'post_get',
        post_id=post.post_id,
    )
    assert response['result'] == {
        'author_ids': [user.user_id],
        'challenge_id': None,
        'data_link': 'http://test.com/data',
        'description': 'description of user',
        'type': 'PLATFORM',
        'likes_count': 5,
        'post_id': post.post_id,
        'is_reviewed': True,
        'preview_link': 'http://test.com',
        'tags_list': ['tag']
    }


async def test_post_unlike(public_api_v1, post_factory, user: User):
    post = await post_factory()

    likes = await manager.count(PostLike.select(PostLike.post_id == post.post_id))
    assert likes == 0

    response = await public_api_v1(
        'post_unlike',
        post_id=post.post_id,
    )
    assert response['result']

    likes = await manager.count(PostLike.select(PostLike.post_id == post.post_id))
    assert likes == 0

    response = await public_api_v1(
        'post_get',
        post_id=post.post_id,
    )
    assert response['result'] == {
        'author_ids': [user.user_id],
        'challenge_id': None,
        'data_link': 'http://test.com/data',
        'description': 'description of user',
        'type': 'PLATFORM',
        'likes_count': 0,
        'post_id': post.post_id,
        'is_reviewed': True,
        'preview_link': 'http://test.com',
        'tags_list': ['tag']
    }


async def test_post_filtered_list__ok_all_existing_post(public_api_v1, post_factory, user: User):
    await post_factory()
    response = await public_api_v1(
        'post_filtered_list',
    )
    assert response['result'] == {
        'posts': [
            {
                'author_ids': [user.user_id],
                'challenge_id': None,
                'data_link': 'http://test.com/data',
                'description': 'description of user',
                'likes_count': 0,
                'post_id': ANY,
                'is_reviewed': True,
                'preview_link': 'http://test.com',
                'tags_list': ['tag'],
                'type': 'PLATFORM'},
        ]
    }


async def test_post_filtered_list__ok_filters_by_user(public_api_v1, post_factory, user_factory, user: User):
    user_1 = await user_factory()
    await post_factory()  # не должен попасть
    post_1 = await post_factory(author_ids=[user_1.user_id], description='solo post')
    post_2 = await post_factory(author_ids=[user_1.user_id, user.user_id], description='collab post')
    response = await public_api_v1(
        'post_filtered_list',
        user_id=user_1.user_id
    )
    assert response['result'] == {
        'posts': [
            {
                'author_ids': [user_1.user_id],
                'challenge_id': None,
                'data_link': 'http://test.com/data',
                'description': 'collab post',
                'likes_count': 0,
                'post_id': post_2.post_id,
                'is_reviewed': True,
                'preview_link': 'http://test.com',
                'tags_list': ['tag'],
                'type': 'PLATFORM'
            },
            {
                'author_ids': [user_1.user_id],  # todo поправить баг в запросуе
                'challenge_id': None,
                'data_link': 'http://test.com/data',
                'description': 'solo post',
                'likes_count': 0,
                'post_id': post_1.post_id,
                'is_reviewed': True,
                'preview_link': 'http://test.com',
                'tags_list': ['tag'],
                'type': 'PLATFORM'
            }
        ]
    }


async def test_post_filtered_list__ok_filters_by_tags(public_api_v1, post_factory, user: User):
    await post_factory()  # не должен попасть
    post_1 = await post_factory(tags_list=['tag1'])
    post_2 = await post_factory(tags_list=['tag1', 'tag2'])
    response = await public_api_v1(
        'post_filtered_list',
        tags=['tag1']
    )
    assert response['result'] == {
        'posts': [
            {
                'author_ids': [user.user_id],
                'challenge_id': None,
                'data_link': 'http://test.com/data',
                'description': 'description of user',
                'likes_count': 0,
                'post_id': post_2.post_id,
                'is_reviewed': True,
                'preview_link': 'http://test.com',
                'tags_list': ['tag1', 'tag2'],
                'type': 'PLATFORM'
            },
            {
                'author_ids': [user.user_id],
                'challenge_id': None,
                'data_link': 'http://test.com/data',
                'description': 'description of user',
                'likes_count': 0,
                'post_id': post_1.post_id,
                'is_reviewed': True,
                'preview_link': 'http://test.com',
                'tags_list': ['tag1'],
                'type': 'PLATFORM'
            },
        ]
    }


@mark.parametrize('status', [True, False])
@mark.parametrize('user_role', enums.UserRoleEnum.admin_roles())
async def test_post_set_reviewed_status__ok(public_api_v1, post_factory, user: User, status, user_role):
    post = await post_factory()
    await user.update_instance(role=user_role)

    response = await public_api_v1(
        'post_set_reviewed_status',
        post_id=post.post_id,
        status=status
    )
    assert response['result'] == {
        'author_ids': [user.user_id],
        'challenge_id': None,
        'data_link': 'http://test.com/data',
        'description': 'description of user',
        'type': 'PLATFORM',
        'likes_count': 0,
        'post_id': post.post_id,
        'is_reviewed': status,
        'preview_link': 'http://test.com',
        'tags_list': ['tag']
    }
    assert (await post.refresh()).to_dict() == {
        'challenge_id': None,
        'data_link': 'http://test.com/data',
        'description': 'description of user',
        'is_reviewed': status,
        'post_id': post.post_id,
        'preview_link': 'http://test.com',
        'tags_list': ['tag'],
        'type': 'PLATFORM'}


@mark.parametrize('user_role', [enums.UserRoleEnum.active, enums.UserRoleEnum.restricted])
async def test_post_set_reviewed_status__error_wrong_role(public_api_v1, post_factory, user: User, user_role):
    post = await post_factory()
    await user.update_instance(role=user_role)

    response = await public_api_v1(
        'post_set_reviewed_status',
        post_id=post.post_id,
        status=True
    )
    assert response['error'] == {'code': 4003, 'data': None, 'message': 'Access denied'}
