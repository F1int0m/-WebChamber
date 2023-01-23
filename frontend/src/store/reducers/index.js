import {combineReducers} from "redux";
import authReducer from './authReducer'
import userReducer from "./userReducer";
import challengeReducer from "./challengeReducer";
import challengeListReducer from "./challengeListReducer";
import postListReducer from "./postListReducer";


export default combineReducers({
    auth: authReducer,
    profile: userReducer,
    postList: postListReducer,
    challenge: challengeReducer,
    challengeList: challengeListReducer
})