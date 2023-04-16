import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function user_notification_update({types_to_update}) {
    const url = JSONRPC_URL + 'user_notification_update'
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
                'notification_list': [
                    {
                    'SUBSCRIBER': types_to_update
                    }
                ]
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_notification_update;