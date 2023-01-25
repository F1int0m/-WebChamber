const POST_GET = 'POST_GET'
const POST_CREATE = 'POST_CREATE'
const POST_LIKE = 'POST_LIKE'
const POST_UNLIKE = 'POST_UNLIKE'

const defaultState = {
    post_id: '',
    challenge_id: '',
    author_ids: [],
    description: '',
    preview_link: '',
    data_link: '',
    type: '',
    tags_list: '',
    likes_count: '',
}

export default function postReducer(state = defaultState, action) {
    switch (action.type) {
        case POST_GET:
            // console.log('(10) done')
            // console.log('postReducer_POST_GET_payload: ', action.payload)
            return {
                ...state,
                post_id: action.payload.post_id,
                challenge_id: action.payload.challenge_id,
                author_ids: action.payload.author_ids,
                description: action.payload.description,
                preview_link: action.payload.preview_link,
                data_link: action.payload.data_link,
                type: action.payload.type,
                tags_list: action.payload.tags_list,
                likes_count: action.payload.likes_count
            }
        case POST_CREATE:
            // console.log('postReducer_POST_CREATE_payload: ', action.payload)
            return {
                ...state,
                challenge_id: action.payload.challenge_id
            }
        case POST_LIKE:
            // Вызывается из страницы просмотра челенджа, при нажатии кнопки добвления работы
            // console.log('postReducer_POST_LIKE_payload: ', action.payload)
            return {
                ...state
                // ...
            }
        case POST_UNLIKE:
            // console.log('postReducer_POST_UNLIKE_payload: ', action.payload)
            return {
                ...state
                // ...
            }
        default:
            return state
    }
}

export const getPost = (postInfo) => ({type: POST_GET, payload: postInfo})
export const createPost = (postInfo) => ({type: POST_CREATE, payload: postInfo})
export const likePost = (postInfo) => ({type: POST_LIKE, payload: postInfo})
export const unlikePost = (postInfo) => ({type: POST_UNLIKE, payload: postInfo})