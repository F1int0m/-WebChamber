import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {getPostFilteredList} from "../../store/reducers/postListReducer";

async function post_filtered_list(dispatch, args) {
    try {
        const req = request_init({
            method: 'post_filtered_list',
            params: [{
                user_id: args.user_id,
                challenge_id: args.challenge_id
            }]
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log('(fetched) post_filtered_list: ', res.result)
                dispatch(getPostFilteredList(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default post_filtered_list;