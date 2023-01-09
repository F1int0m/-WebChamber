import {combineReducers} from "redux";
import auth from './auth'
import profileReducer from "./ProfileReducer";


export default combineReducers({
    auth,
    profile: profileReducer
})