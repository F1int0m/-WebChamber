import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {setSelfUserInfo} from "../../store/reducers/userReducer";

async function user_get_self(dispatch) {
    try {
        const req = request_init({
            method: 'user_get_self',
            params: []
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                dispatch(setSelfUserInfo(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default user_get_self;