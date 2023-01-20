import datetime

import freezegun as freezegun
from asynctest import ANY
from common.db.models import Challenge
from common.enums import ChallengeStatusEnum


@freezegun.freeze_time(datetime.date(2022, 10, 12))
async def test_create_challenge__ok(public_api_v1):
    response = await public_api_v1(
        'challenge_create',
        name='test challenge',
        description='test description fo challenge',
        end_datetime='27-12-2032 00:43:33'
    )

    assert response['result'] == {
        'background_link': None,
        'challenge_id': ANY,
        'create_datetime': '2022-10-12T00:00:00+00:00',
        'description': 'test description fo challenge',
        'end_datetime': '2032-12-27T00:43:33+00:00',
        'name': 'test challenge',
        'status': 'WAIT_FOR_REVIEW',
        'total_likes': 0
    }
    challenge = await Challenge.get()
    assert challenge.to_dict() == {
        'background_link': None,
        'challenge_id': ANY,
        'create_datetime': ANY,
        'description': 'test description fo challenge',
        'end_datetime': ANY,
        'name': 'test challenge',
        'status': ChallengeStatusEnum.wait_for_review
    }


@freezegun.freeze_time(datetime.date(2022, 10, 12))
async def test_get_challenge__ok(public_api_v1, challenge_factory):
    challenge = await challenge_factory()

    response = await public_api_v1(
        'challenge_get',
        challenge_id=challenge.challenge_id,
    )
    assert response['result'] == {
        'background_link': None,
        'challenge_id': challenge.challenge_id,
        'create_datetime': '2022-10-12T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-12T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'WAIT_FOR_REVIEW',
        'total_likes': 0
    }


async def test_challenge_filtered_list__ok_no_filter(public_api_v1, challenge_factory):
    challenge_1 = await challenge_factory(
        create_datetime=datetime.date(2022, 10, 1),
        end_datetime=datetime.date(2022, 10, 11),
        status=ChallengeStatusEnum.wait_for_review
    )
    challenge_2 = await challenge_factory(
        create_datetime=datetime.date(2022, 10, 2),
        end_datetime=datetime.date(2022, 10, 12),
        status=ChallengeStatusEnum.active,
    )
    challenge_3 = await challenge_factory(
        create_datetime=datetime.date(2022, 10, 3),
        end_datetime=datetime.date(2022, 10, 13),
        status=ChallengeStatusEnum.deleted,
    )
    challenge_1_data = {
        'background_link': None,
        'challenge_id': challenge_1.challenge_id,
        'create_datetime': '2022-10-01T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-11T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'WAIT_FOR_REVIEW',
        'total_likes': 0
    }
    challenge_2_data = {
        'background_link': None,
        'challenge_id': challenge_2.challenge_id,
        'create_datetime': '2022-10-02T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-12T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'ACTIVE',
        'total_likes': 0
    }
    challenge_3_data = {
        'background_link': None,
        'challenge_id': challenge_3.challenge_id,
        'create_datetime': '2022-10-03T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-13T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'DELETED',
        'total_likes': 0
    }

    response = await public_api_v1(
        'challenge_filtered_list',
    )

    response_challenges = response['result']['challenges']
    assert len(response_challenges) == 3

    assert challenge_1_data in response_challenges
    assert challenge_2_data in response_challenges
    assert challenge_3_data in response_challenges


@freezegun.freeze_time(datetime.date(2022, 10, 12))
async def test_challenge_filtered_list__ok_filter_create_date(public_api_v1, challenge_factory):
    await challenge_factory(
        create_datetime=datetime.date(2022, 10, 1),
        end_datetime=datetime.date(2022, 10, 11),
        status=ChallengeStatusEnum.wait_for_review
    )
    challenge_2 = await challenge_factory(
        create_datetime=datetime.date(2022, 10, 2),
        end_datetime=datetime.date(2022, 10, 12),
        status=ChallengeStatusEnum.active,
    )
    challenge_3 = await challenge_factory(
        create_datetime=datetime.date(2022, 10, 3),
        end_datetime=datetime.date(2022, 10, 13),
        status=ChallengeStatusEnum.deleted,
    )
    challenge_2_data = {
        'background_link': None,
        'challenge_id': challenge_2.challenge_id,
        'create_datetime': '2022-10-02T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-12T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'ACTIVE',
        'total_likes': 0
    }
    challenge_3_data = {
        'background_link': None,
        'challenge_id': challenge_3.challenge_id,
        'create_datetime': '2022-10-03T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-13T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'DELETED',
        'total_likes': 0
    }

    response = await public_api_v1(
        'challenge_filtered_list',
        create_datetime='01-10-2022 12:00:00'
    )

    response_challenges = response['result']['challenges']
    assert len(response_challenges) == 2

    assert challenge_2_data in response_challenges
    assert challenge_3_data in response_challenges


@freezegun.freeze_time(datetime.date(2022, 10, 12))
async def test_challenge_filtered_list__ok_filter_end_date(public_api_v1, challenge_factory):
    challenge_1 = await challenge_factory(
        create_datetime=datetime.date(2022, 10, 1),
        end_datetime=datetime.date(2022, 10, 11),
        status=ChallengeStatusEnum.wait_for_review
    )
    challenge_2 = await challenge_factory(
        create_datetime=datetime.date(2022, 10, 2),
        end_datetime=datetime.date(2022, 10, 12),
        status=ChallengeStatusEnum.active,
    )
    await challenge_factory(
        create_datetime=datetime.date(2022, 10, 3),
        end_datetime=datetime.date(2022, 10, 13),
        status=ChallengeStatusEnum.deleted,
    )
    challenge_1_data = {
        'background_link': None,
        'challenge_id': challenge_1.challenge_id,
        'create_datetime': '2022-10-01T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-11T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'WAIT_FOR_REVIEW',
        'total_likes': 0
    }
    challenge_2_data = {
        'background_link': None,
        'challenge_id': challenge_2.challenge_id,
        'create_datetime': '2022-10-02T00:00:00+00:00',
        'description': 'description of challenge',
        'end_datetime': '2022-10-12T00:00:00+00:00',
        'name': 'test_challenge_name',
        'status': 'ACTIVE',
        'total_likes': 0
    }

    response = await public_api_v1(
        'challenge_filtered_list',
        end_datetime='12-10-2022 12:00:00'
    )

    response_challenges = response['result']['challenges']
    assert len(response_challenges) == 2

    assert challenge_1_data in response_challenges
    assert challenge_2_data in response_challenges


async def test_challenge_edit__ok(public_api_v1, challenge_factory):
    challenge = await challenge_factory()
    assert challenge.to_dict() == {
        'background_link': None,
        'challenge_id': challenge.challenge_id,
        'create_datetime': ANY,
        'description': 'description of challenge',
        'end_datetime': ANY,
        'name': 'test_challenge_name',
        'status': 'WAIT_FOR_REVIEW',
    }

    response = await public_api_v1(
        method='challenge_edit',
        challenge_id=challenge.challenge_id,
        description='edited description of challenge',
    )
    assert response == {
        'id': 2,
        'jsonrpc': '2.0',
        'result': {
            'background_link': None,
            'challenge_id': challenge.challenge_id,
            'create_datetime': ANY,
            'description': 'edited description of challenge',
            'end_datetime': ANY,
            'name': 'test_challenge_name',
            'status': 'WAIT_FOR_REVIEW',
            'total_likes': 0
        }
    }

    challenge = await challenge.refresh()
    assert challenge.to_dict() == {
        'background_link': None,
        'challenge_id': challenge.challenge_id,
        'create_datetime': ANY,
        'description': 'edited description of challenge',
        'end_datetime': ANY,
        'name': 'test_challenge_name',
        'status': 'WAIT_FOR_REVIEW',
    }
