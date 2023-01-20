import {combineReducers} from "redux";
import authReducer from './authReducer'
import userReducer from "./userReducer";
import challengeReducer from "./challengeReducer";
import challengeListReducer from "./challengeListReducer";


export default combineReducers({
    auth: authReducer,
    profile: userReducer,
    challenge: challengeReducer,
    challengeList: challengeListReducer
})