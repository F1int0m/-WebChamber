const GET_SUBSCRIBERS = 'GET_SUBSCRIBERS'
const SUBSCRIBE = 'SUBSCRIBE'
const UNSUBSCRIBE = 'UNSUBSCRIBE'



export default function userReducer(state = {}, action) {
    switch (action.type) {
        case SUBSCRIBE:
            return {
                ...state,
                user_id: action.payload.user_id,
                role: action.payload.role,
                nickname: action.payload.nickname,
                description: action.payload.description,
                avatar_link: action.payload.avatar_link,
                isSelf: true
            }
        default:
            return state
    }
}

export const subscribe = (userInfo) => ({type: SUBSCRIBE, payload: userInfo})