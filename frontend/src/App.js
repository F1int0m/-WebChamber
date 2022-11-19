import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

function App() {
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
    <div className="App">
      <h3>Current token: {token}</h3>
      <form>
        <label>Type new token:</label>
        <input onChange={e => HandleChange(e)}/>
        <button type={"button"} onClick={UpdateToken}>Update token</button>
      </form>
    </div>
  );
}

export default App;
