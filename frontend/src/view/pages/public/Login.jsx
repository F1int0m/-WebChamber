import React from 'react';
//import {useNavigate} from "react-router-dom";
//import {useDispatch, useSelector} from "react-redux";
import {SetOAuthToken} from "../../../actions/auth/setOAuthToken";

function Login() {
    // const navigate = useNavigate();
    // const authCheck = useDispatch()
    // const [newToken, setNewToken] = useState()

    function HandleClick() {
        // TODO: сделать приватные страницы приватными
        SetOAuthToken()
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={HandleClick}>vk auth</button>
        </div>
    );
}

export default Login;