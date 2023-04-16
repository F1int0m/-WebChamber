import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function user_unsubscribe({user_id}) {
    const url = JSONRPC_URL + 'user_unsubscribe'
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
                'user_id': user_id
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_unsubscribe;