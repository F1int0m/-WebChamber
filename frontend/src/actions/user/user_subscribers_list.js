import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function user_subscribers_list() {
    const url = JSONRPC_URL + 'user_subscribers_list'
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

export default user_subscribers_list;