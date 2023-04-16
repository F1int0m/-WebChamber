import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init";
import {getUser} from "../../store/reducers/userReducer";

// TODO: убрать дебаг-код (консоль-логи)

async function user_subscribe(dispatch, user_id) {
    try {
        const req = request_init({
            method: 'user_subscribe',
            params: {
                user_id: user_id
            }
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                // console.log('(12) done')
                // console.log('(fetched) user_get: ', res)
                // console.log('(13) getUser -> userReducer')
                dispatch(getUser(res.result))
            })
            .catch((res) => console.log(res))
    } catch (e) {
        console.error(e)
    }
}

export default user_subscribe;