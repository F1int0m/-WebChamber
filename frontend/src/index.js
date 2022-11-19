import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import {Provider} from "react-redux";

const InitState = () => {
    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token')
    if (!id && !token) {
        localStorage.setItem('id', '1')
        localStorage.setItem('token', 'old_token')
        id = localStorage.getItem('id')
        token = localStorage.getItem('token')
    }
    return {
        id: id,
        token: token
    }
}

const defaultState = InitState()

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            localStorage.setItem('token', action.payload)
            return {...state, token: action.payload}
        default:
            return state
    }
}
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
