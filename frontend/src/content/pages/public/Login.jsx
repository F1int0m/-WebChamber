import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FETCH_AUTH_URL} from "../../../env";

function Login() {
    // v 1.5
    const navigate = useNavigate();
    const authCheck = useDispatch()
    const [newToken, setNewToken] = useState()

    async function FetchToken() {
        const response = await fetch(FETCH_AUTH_URL)
            .then(res => res.json())
        return response;
    }

    function HandleClick() {
        // TODO: сделать авторизацию по vk-токену
        // TODO: сделать приватные страницы приватными

        const nt = FetchToken()
        setNewToken(nt)
        authCheck({type: 'LOGIN', payload: newToken})
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