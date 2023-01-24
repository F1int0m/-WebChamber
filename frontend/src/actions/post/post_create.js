import request_init from "../../system/json_rpc/request_init";
import {JSONRPC_URL} from "../../system/env";

async function post_create(dispatch, args) {
    try {

        const req = request_init({
            method: 'post_create',
            params: [{
                name: args.name,
                description: args.description,
                external_data: {
                    externalPostData: {
                        external_data_link: args.external_data_link
                    }
                }
            }]
        })
        await fetch(JSONRPC_URL, req)
            .then(res => res.json())
            .then(res => {
                console.log('(fetched) post_create: ', res.result)
            })
            .then(async function(res) {
                const FILE_UPLOAD_URL = '/file/post-data/' + res.post_id + '/' + args.file_name
                await fetch(FILE_UPLOAD_URL)
            })
    } catch (e) {
        console.error(e)
    }
}

export default post_create;