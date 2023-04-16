import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"
import {getChallenge} from "../../store/reducers/challengeReducer";

// TODO: убрать дебаг-код (консоль-логи)

async function challenge_get(dispatch, args) {
    try {
        const req = request_init({
            method: 'challenge_get',
            params: {
                challenge_id: args.challenge_id
            }
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log('(Fetched) challenge_get: ', res.result)
                dispatch(getChallenge(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default challenge_get;