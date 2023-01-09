import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {store} from "../../store/store";

const state = store.getState()
const token = state.auth.token

async function user_get_self() {
    try {
        console.log('> token: ', token)
        const req = request_init({
            token: token,
            method: 'user_get_self',
            params: []
        })
        return await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => res.result)
    } catch (e) {
        console.error(e)
    }
}

export default user_get_self;