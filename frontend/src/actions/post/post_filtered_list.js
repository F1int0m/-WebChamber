import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {getPostFilteredList} from "../../store/reducers/postListReducer";

// TODO: убрать дебаг-код (консоль-логи)

async function post_filtered_list(dispatch, args) {

    const _params = {}
    if (args.user_id)
        _params.user_id = args.user_id
    if (args.challenge_id)
        _params.challenge_id = args.challenge_id

    try {
        // console.log('post_filtered_list args: ', args)
        const req = request_init({
            method: 'post_filtered_list',
            params: _params
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                // console.log('(7-16) done')
                // console.log('(fetched) post_filtered_list: ', res.result)
                // console.log('(8-11-17) getPostFilteredList -> postListReducer')
                dispatch(getPostFilteredList(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default post_filtered_list;