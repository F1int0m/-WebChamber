import {createStore} from "redux";

const InitState = () => {
    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token')
    if (!id && !token) {
        localStorage.setItem('id', '1')
        localStorage.setItem('token', 'not_found')
        id = localStorage.getItem('id')
        token = localStorage.getItem('token')
    }
    return {
        id: id,
        token: token,
        is_auth: false
    }
}

const defaultState = InitState()

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload);
            return {...state, token: action.payload, is_auth: true}
        case 'LOGOUT':
            localStorage.removeItem('token')
            return {...state, token: '', is_auth: false}
        default:
            return state
    }
}

export const store = createStore(authReducer)