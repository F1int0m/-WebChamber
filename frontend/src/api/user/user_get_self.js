import {JSONRPC_URL} from "../../system/env";

async function user_get_self() {
    const url = JSONRPC_URL + 'user_get_self'
    await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            'jsonrpc': '2.0',
            'method': '',
            'params': [],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_get_self;