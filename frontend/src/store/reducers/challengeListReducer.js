const CHALLENGE_FILTERED_LIST = 'CHALLENGE_FILTERED_LIST'

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
        case CHALLENGE_FILTERED_LIST:
            console.log('(3) done')
            console.log('challengeListReducer_payload: ', action.payload)
            return {
                ...state,
                challenges: action.payload.challenges
            }
        default:
            return state
    }
}

export const getChallengeList = (challengeListInfo) => ({type: CHALLENGE_FILTERED_LIST, payload: challengeListInfo})