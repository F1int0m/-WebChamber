import {createStore} from "redux";
import {SetOAuthToken} from "../auth/setOAuthToken";

const InitState = () => {
    // TODO: Нам нужно узнавать id юзера сразу после авторизации? Если да,
    //  то прописать соответствующий метод и вызывать сразу после отлова токена в сторе
    return {
        id: '',
        is_auth: false
    }
}

const defaultState = InitState()

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            SetOAuthToken()
            // TODO: id = getUserID()
            return {...state, is_auth: true}
        case 'LOGOUT':
            localStorage.removeItem('token')
            // TODO: id = ''
            return {...state, token: '', is_auth: false}
        default:
            return state
    }
}

export const store = createStore(authReducer)