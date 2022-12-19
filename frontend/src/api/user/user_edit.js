import {JSONRPC_URL} from "../../system/env";

async function user_edit({nickname, mood_text, description}) {
    const url = JSONRPC_URL + 'user_edit'
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
                'nickname': nickname,
                'mood_text': mood_text,
                'description': description,
            }],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default user_edit;