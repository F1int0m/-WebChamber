import {createStore, applyMiddleware} from "redux";
import rootReducer from './reducers/index';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));