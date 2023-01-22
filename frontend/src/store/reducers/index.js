import {combineReducers} from "redux";
import authReducer from './authReducer'
import userReducer from "./userReducer";
import challengeReducer from "./challengeReducer";
import challengeListReducer from "./challengeListReducer";
import postReducer from "./postReducer";


export default combineReducers({
    auth: authReducer,
    profile: userReducer,
    posts: postReducer,
    challenge: challengeReducer,
    challengeList: challengeListReducer
})