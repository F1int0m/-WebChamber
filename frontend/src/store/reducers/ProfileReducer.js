const defaultState = {
    inLoading: true,
    user_id: -1,
    role: '',
    nickname: '',
    mood_text: '',
    description: '',
    avatar_link: '',
    token: 'CX5C-e6hhAOKQEbtR8X3'
}

export default function profileReducer(state = defaultState, action) {
    switch (action.type) {
        case 'profile/get_self':
            return {
                ...state,
                inLoading: action.payload.isLoading,
                user_id: action.payload.user_id,
                role: action.payload.role,
                nickname: action.payload.nickname,
                mood_text: action.payload.mood_text,
                description: action.payload.description,
                avatar_link: action.payload.avatar_link
            }
        case 'GET':
            return state
        default:
            return state
    }
}