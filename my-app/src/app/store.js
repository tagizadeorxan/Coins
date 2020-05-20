import {createStore,applyMiddleware,combineReducers,compose } from 'redux';
import reducer from '../features/reducer';
import newReducer from '../features/newReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// const myLogger = (store) => (next) => (action) => {
//     console.log("Logged Action:",action);
//     next(action); 
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({reducer, newReducer}),composeEnhancers(applyMiddleware(logger,thunk)));
export default store;