const GET = 'GET'
const CREATE = 'CREATE'
const UPDATE = 'UPDATE'

const defaultState = {
    challenge_id: '',
    name: '',
    description: '',
    create_datetime: 'DD-MM-YYYY HH:MM:SS',
    end_datetime: 'DD-MM-YYYY HH:MM:SS',
    status: '',
    background_link: '',
    total_likes: ''
}

export default function challengeReducer(state = defaultState, action) {
    switch (action.type) {
        case GET:
            return {
                ...state,
                challenge_id: action.payload.challenge_id,
                name: action.payload.name,
                description: action.payload.description,
                create_datetime: action.payload. create_datetime,
                end_datetime: action.payload.end_datetime,
                status: action.payload.status,
                background_link: action.payload.background_link,
                total_likes: action.payload.total_likes
            }
        case CREATE:
            /* const newChallenge = {
                name: action.payload.name,
                description: action.payload.description,
                end_datetime: action.payload.end_datetime,
                background_link: action.payload.background_link
            } */
            // api-запрос
            return state
        case UPDATE:
            return {
                ...state,
                name: action.payload.name || state.name,
                description: action.payload.description || state.description,
                end_datetime: action.payload.end_datetime || state.end_datetime,
                status: action.payload.status || state.status,
                background_link: action.payload.background_link || state.background_link
            }
            // api-запрос
        default:
            return state
    }
}

export const getChallenge = (challengeInfo) => ({type: GET, payload: challengeInfo})
export const updateChallenge = (challengeInfo) => ({type: UPDATE, payload: challengeInfo})
export const createChallenge = (challengeInfo) => ({type: CREATE, payload: challengeInfo})