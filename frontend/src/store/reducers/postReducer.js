const POST_FILTERED_LIST = 'POST_FILTERED_LIST'
const POST_GET = 'POST_GET'
const POST_LIKE = 'POST_LIKE'
const POST_UNLIKE = 'POST_UNLIKE'


const defaultState = {
    post_id: -1,
    challenge_id: -1,
    author_ids: '',
    description: '',
    preview_link: '',
    data_link: '',
    type: '',
    tags_list: '',
    likes_count: ''
}

export default function postReducer(state = defaultState, action) {
    switch (action.type) {
        case POST_FILTERED_LIST:
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
        default:
            return state
    }
}

export const setPostFilteredList = (postFilteredList) => ({type: POST_FILTERED_LIST, payload: postFilteredList})