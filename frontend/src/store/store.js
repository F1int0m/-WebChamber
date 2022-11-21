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
        token: token
    }
}

const defaultState = InitState()

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            localStorage.setItem('token', action.payload)
            return {...state, token: action.payload}
        default:
            return state
    }
}

export const store = createStore(authReducer)