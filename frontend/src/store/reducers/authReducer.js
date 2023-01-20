import {SetOAuthToken} from "../../actions/auth/setOAuthToken";

const InitState = () => {
    return {
        id: '232868007',
        is_auth: false,
        token: 'XofLV8BtvRK84oIBqfAr'
    }
}

const defaultState = InitState()

export default function authReducer(state = defaultState, action) {
    switch (action.type) {
        case 'GET_AUTH_TOKEN':
            return state
        case 'LOGIN':
            SetOAuthToken()
            // TODO: id = getUserID()
            return {...state, is_auth: true}
        case 'LOGOUT':
            localStorage.removeItem('token')
            // TODO: id = ''
            return {...state, auth_token: '', is_auth: false}
        default:
            return state
    }
}