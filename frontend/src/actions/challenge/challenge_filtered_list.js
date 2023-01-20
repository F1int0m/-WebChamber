import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {getChallengeList} from "../../store/reducers/challengeListReducer";

async function challenge_filtered_list(dispatch) {
    try {
        const req = request_init({
            method: 'challenge_filtered_list',
            params: []
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log(res.result)
                dispatch(getChallengeList(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default challenge_filtered_list;