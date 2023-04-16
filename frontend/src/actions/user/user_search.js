import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function user_search({nickname_substring}) {
    const url = JSONRPC_URL + 'user_search'
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
                'nickname_substring': nickname_substring
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_search;