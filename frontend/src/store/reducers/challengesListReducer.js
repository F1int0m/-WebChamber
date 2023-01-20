const GET = 'GET'

const defaultState = {
    challengesList: [],
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
        case GET:
            console.log('reducer payload: ', action.payload)
            return {
                ...state,
                challengesList: action.payload.challengesList
            }
        default:
            return state
    }
}

export const getChallengeList = (challengeListInfo) => ({type: GET, payload: challengeListInfo})