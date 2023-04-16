import {JSONRPC_URL} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function user_edit({nickname, mood_text, description}) {
    await fetch(JSONRPC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'webchamber_token': 'jG-ooRJ-yU_sLANU6LUu'
        },
        body: {
            'jsonrpc': '2.0',
            'method': 'user_edit',
            'params': [{
                'nickname': nickname,
                'mood_text': mood_text,
                'description': description,
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_edit;