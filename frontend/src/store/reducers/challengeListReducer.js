const GET_LIST = 'GET_LIST'

const defaultState = {
    challenges: [],
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

export default function challengeListReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_LIST:
            console.log('challengeListReducer_GET_LIST_payload: ', action.payload)
            return {
                ...state,
                challenges: action.payload.challenges
            }
        default:
            return state
    }
}

export const getChallengeList = (challengeListInfo) => ({type: GET_LIST, payload: challengeListInfo})