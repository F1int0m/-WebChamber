import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

const TokenSetup = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const [newToken, setNewToken] = useState('')

    const UpdateToken = () => {
        console.log(newToken)
        dispatch({type: 'UPDATE_TOKEN', payload: newToken})
    }

    const HandleChange = (e) => {
        setNewToken(e.target.value)
    }
    return (
        <div>
            <h3>Current token: {token}</h3>
            <form>
                <label>Type new token:</label>
                <input onChange={e => HandleChange(e)}/>
                <button type={"button"} onClick={UpdateToken}>Update token</button>
            </form>
        </div>
    );
};

export default TokenSetup;