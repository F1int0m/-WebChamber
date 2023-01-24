import request_init from "../../system/json_rpc/request_init";
import {JSONRPC_URL, MEDIA_SERVER_HOST} from "../../system/env";

async function externalDataCheck(res, args) {
    if (!args.external_data_link) {
        console.log('got into !external_data_link case with value: ', res)
        return async function() {
            console.log('sending file: ', res)
            const post_id = res.result.PostResponse.post_id
            const FILE_UPLOAD_URL = MEDIA_SERVER_HOST + 'file/post-data/' + post_id + '/' + args.file.name
            await fetch(FILE_UPLOAD_URL, {
                method: 'POST',
                body: args.file,
                headers: {
                    'content-type': args.file.type,
                    'content-length': `${args.file.size}`,
                }
            }).then((res) => {
                console.log('(fetched) file_upload: ', res)
            }).catch()
        }
    }
}

async function post_create(dispatch, args) {
    try {
        const params_to_json = {
            description: args.description,
            tags_list: args.tags_list,
            external_data: args.external_data,
            additional_authors_ids: args.authors,
            challenge_id: args.challenge_id
        }
        const req = request_init({
            method: 'post_create',
            params: params_to_json.json()
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log('(fetched) post_create: ', res.result)
            })
            .then((res) => externalDataCheck(res, args))
    } catch (e) {
        console.error(e)
    }
}

export default post_create;