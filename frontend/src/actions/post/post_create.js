import request_init from "../../system/json_rpc/request_init";
import {JSONRPC_URL, SERVER_HOST} from "../../system/env";

// TODO: убрать дебаг-код (консоль-логи)

async function externalDataCheck(res, args) {
    if (!args.external_data_link) {
        console.log('got into !external_data_link case with value: ', res)
        const post_id = res.result.post_id
        const FILE_UPLOAD_URL = SERVER_HOST + 'file/post-data/' + post_id + '/' + args.file.name
        await fetch(FILE_UPLOAD_URL, {
            method: 'POST',
            body: args.file,
            headers: {
                'Content-type': args.file.type,
                'Content-length': `${args.file.size}`,
                'webchamber_token': 12345
            }
        }).then((res) => {
            console.log('(fetched) file_upload: ', res)
        }).catch((res) => console.log(res))
    }
}


async function post_create(dispatch, args) {
    try {
        const req = request_init({
            method: 'post_create',
            params: {
                description: args.description,
                tags_list: args.tags_list,
                challenge_id: args.challenge_id
            }
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            //.then((res) => console.log(res))
            .then((res) => externalDataCheck(res, args))
            .catch((res) => console.log(res))
        //.then((res) => externalDataCheck(res, args))
    } catch (e) {
        console.error(e)
    }
}

export default post_create;