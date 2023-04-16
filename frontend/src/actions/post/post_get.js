import request_init from "../../system/json_rpc/request_init";
import {JSONRPC_URL} from "../../system/env";
import {getPost} from "../../store/reducers/postReducer";

// TODO: убрать дебаг-код (консоль-логи)

async function post_get(dispatch, args) {
    try {
        const req = request_init({
            method: 'post_get',
            params: [{
                // ...
            }]
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log('(fetched) post_get: ', res.result)
                dispatch(getPost(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default post_get;