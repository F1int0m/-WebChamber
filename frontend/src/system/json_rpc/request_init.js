import {store} from "../../store/store";

function request_init(args) {
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json',

    const state = store.getState()
    const token = state.auth.token
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'webchamber_token': token
        },
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'method': args.method,
            'params': args.params,
            'id': 1
        })
    }
}

export default request_init;