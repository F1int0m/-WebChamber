const POST_FILTERED_LIST = 'POST_FILTERED_LIST'

const defaultState = {
    posts: [],
    search_args: {
        create_datetime: 'DD-MM-YYYY HH:MM:SS',
        end_datetime: 'DD-MM-YYYY HH:MM:SS',
        status: ''
    },
    pagination_args: {
        page: '',
        limit: ''
    }
}

export default function postListReducer(state = defaultState, action) {
    switch (action.type) {
        case POST_FILTERED_LIST:
            // console.log('(8-11-17) done')
            // console.log('postListReducer_POST_FILTERED_LIST_payload: ', action.payload)
            return {
                ...state,
                posts: action.payload.posts
            }
        default:
            return state
    }
}

export const getPostFilteredList = (postFilteredList) => ({type: POST_FILTERED_LIST, payload: postFilteredList})