import {JSONRPC_URL} from "../../system/env";

async function user_get({user_id}) {
    await fetch(JSONRPC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'webchamber_token': 'jG-ooRJ-yU_sLANU6LUu'
        },
        body: {
            'jsonrpc': '2.0',
            'method': 'user_get',
            'params': [{
                'user_id': user_id
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_get;