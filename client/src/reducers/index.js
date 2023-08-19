import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import journalReducer from './journalReducer';

const rootReducer = combineReducers({
    user: userReducer,
    journal: journalReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))