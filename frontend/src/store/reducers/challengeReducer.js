import challenge_create from "../../actions/challenge/challenge_create";
import challenge_update from "../../actions/challenge/challenge_update";

const GET = 'GET'
const CREATE = 'CREATE'
const UPDATE = 'UPDATE'

const defaultState = {
    challenge_id: '',
    name: 'default',
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
            //console.log('challengeReducer_GET_payload: ', action.payload)
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
            console.log('reducer payload: ', action.payload)
            const newChallenge = {
                name: action.payload.name,
                description: action.payload.description,
                end_datetime: action.payload.end_datetime,
                background_link: action.payload.background_link
            }
            challenge_create(newChallenge).then()
            return state
        case UPDATE:
            console.log('reducer payload: ', action.payload)
            const updatedChallenge = {
                name: action.payload.name || state.name,
                description: action.payload.description || state.description,
                end_datetime: action.payload.end_datetime || state.background_link,
                status: action.payload.status || state.status,
                background_link: action.payload.background_link || state.background_link
            }
            challenge_update(updatedChallenge).then()
            return {
                ...state,
                name: updatedChallenge.name || state.name,
                description: updatedChallenge.description || state.description,
                end_datetime: updatedChallenge.end_datetime || state.end_datetime,
                status: updatedChallenge.status || state.status,
                background_link: updatedChallenge.background_link || state.background_link
            }
        default:
            return state
    }
}

export const getChallenge = (challengeInfo) => ({type: GET, payload: challengeInfo})
export const updateChallenge = (challengeInfo) => ({type: UPDATE, payload: challengeInfo})
export const createChallenge = (challengeInfo) => ({type: CREATE, payload: challengeInfo})