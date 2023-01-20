import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"

async function challenge_create({dispatch, args}) {
    try {
        const req = request_init({
            method: 'challenge_create',
            params: [{
                name: args.name,
                description: args.description,
                end_datetime: args.end_datetime
            }]
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log(res.result)
                // dispatch(setter(res.result))
            })
    } catch (e) {
        console.error(e)
    }
}

export default challenge_create;