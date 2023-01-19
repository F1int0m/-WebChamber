const GET_SELF = 'GET_SELF'
const GET = 'GET'


const defaultState = {
    user_id: -1,
    role: '',
    nickname: '',
    mood_text: '',
    description: '',
    avatar_link: ''
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case GET_SELF:
            return {
                ...state,
                user_id: action.payload.user_id,
                role: action.payload.role,
                nickname: action.payload.nickname,
                mood_text: action.payload.mood_text,
                description: action.payload.description,
                avatar_link: action.payload.avatar_link
            }
        case GET:
            return {
                ...state,
                user_id: action.payload.user_id,
                role: action.payload.role,
                nickname: action.payload.nickname,
                mood_text: action.payload.mood_text,
                description: action.payload.description,
                avatar_link: action.payload.avatar_link
            }
        default:
            return state
    }
}

export const setSelfUserInfo = (userInfo) => ({type: GET_SELF, payload: userInfo})
export const setUserInfo = (userInfo) => ({type: GET, payload: userInfo})