import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function user_set_role({user_id, user_role}) {
    const url = JSONRPC_URL + 'user_set_role'
    await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            'jsonrpc': '2.0',
            'method': '',
            'params': [{
                'user_id': user_id,
                'user_role': user_role
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_set_role;