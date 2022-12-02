import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SetOAuthToken} from "../../../auth/setOAuthToken";

function Login() {
    const navigate = useNavigate();
    const authCheck = useDispatch()

    function HandleClick() {
        // TODO: сделать авторизацию по vk-токену
        // TODO: сделать приватные страницы приватными

        SetOAuthToken()
        authCheck({type: 'LOGIN', payload: ''})
        navigate('/content/challenges');
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={HandleClick}>vk auth</button>
        </div>
    );
}

export default Login;