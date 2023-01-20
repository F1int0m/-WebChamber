import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {getUser} from "../../store/reducers/userReducer";

async function user_get(dispatch, {user_id}) {
    try {
        const req = request_init({
            method: 'user_get',
            params: [{
                user_id: user_id
            }]
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                dispatch(getUser(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default user_get;