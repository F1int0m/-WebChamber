import {SetOAuthToken} from "../../api/auth/setOAuthToken";

const InitState = () => {
    return {
        id: '',
        is_auth: false,
        token: 'Nl0w-RuANypFFs2qlNMe'
    }
}

const defaultState = InitState()

export default function auth(state = defaultState, action) {
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