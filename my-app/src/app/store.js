import {createStore,applyMiddleware,combineReducers,compose } from 'redux';
import newReducer from '../features/newReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({newReducer}),composeEnhancers(applyMiddleware(logger,thunk)));
export default store;