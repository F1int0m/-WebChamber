import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function Login() {
    const navigate = useNavigate();
    const authCheck = useDispatch()
    const token = useSelector(state => state.token)

    function HandleClick() {
        // TODO: сделать авторизацию по vk-токену
        // TODO: сделать приватные страницы приватными
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