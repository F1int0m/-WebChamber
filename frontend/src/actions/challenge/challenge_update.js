import {JSONRPC_URL} from "../../system/env";
import request_init from "../../system/json_rpc/request_init"

// TODO: убрать дебаг-код (консоль-логи)

async function challenge_update(args) {
    try {
        const req = request_init({
            method: 'challenge_update',
            params: {
                name: args.name,
                description: args.description,
                end_datetime: args.end_datetime,
                status: args.status,
                background_link: args.background_link
            }
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log(res.result)
            })
    } catch (e) {
        console.error(e)
    }
}

export default challenge_update;