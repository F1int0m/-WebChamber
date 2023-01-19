import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {setSelfUserInfo} from "../../store/reducers/userReducer";
import {setPostFilteredList} from "../../store/reducers/postReducer";

async function post_filtered_list(dispatch, args) {
    try {
        const req = request_init({
            method: 'post_filtered_list',
            params: [{
                user_id: args.user_id
            }]
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log(res.result)
                dispatch(setPostFilteredList(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default post_filtered_list;