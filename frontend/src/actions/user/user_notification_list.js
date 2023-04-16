import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function user_notification_list({only_unwatched}) {
    const url = JSONRPC_URL + 'user_notification_list'
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
                'only_unwatched': only_unwatched
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_notification_list;