import {JSONRPC_URL} from "../../system/env";

async function ping() {
    const url = 'http://212.220.113.111/backend/api/v1/public/jsonrpc'
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Cookie': 'webchamber_token=FcJWulBWDRYVm0k84RPz',
        },
        body: {
            'jsonrpc': '2.0',
            'method': 'ping',
            'params': [],
            'id': 0
        }
    }).then(response => console.log(response))
}

export default ping;