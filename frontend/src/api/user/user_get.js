import {JSONRPC_URL} from "../../system/env";

async function user_get({user_id}) {
    const url = JSONRPC_URL + 'user_get'
    await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'webchamber_token=FcJWulBWDRYVm0k84RPz'
        },
        body: {
            'jsonrpc': '2.0',
            'method': '',
            'params': [{
                'user_id': user_id
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_get;