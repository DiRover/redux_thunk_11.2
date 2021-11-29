import { createStore, combineReducers, compose, } from 'redux';
import listReducer from '../reducers/reducer';

const reducer = combineReducers({ //собираем рэдьюсер
  list: listReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers);


export default store;
