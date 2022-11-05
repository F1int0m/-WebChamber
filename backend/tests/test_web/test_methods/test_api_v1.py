async def test_ping__ok(public_api_v1):
    resp = await public_api_v1(method='ping')
    assert resp == {
        'id': 2,
        'jsonrpc': '2.0',
        'result': {'text': 'pong!'}
    }
