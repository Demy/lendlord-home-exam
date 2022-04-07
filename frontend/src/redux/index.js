import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './users/reducer';

const middleware = [thunk];
const initionState = {};
const rootReducer =  combineReducers({
  users: usersReducer,
});

const store = createStore(rootReducer, initionState, applyMiddleware(...middleware));

export default store;