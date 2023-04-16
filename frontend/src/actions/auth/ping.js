import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function ping() {
    await fetch(JSONRPC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'webchamber_token': 'NDL-6fLoAfbDc4ckJp7y',
        },
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'method': 'ping',
            'params': [],
            'id': 0
        })
    }).then(response => console.log(response))
}

export default ping;