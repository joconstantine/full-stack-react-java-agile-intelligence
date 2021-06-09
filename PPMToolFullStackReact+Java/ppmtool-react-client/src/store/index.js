import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middleWare = [thunk];

let store;
if (window.navigator.userAgent.includes("Chrome")) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWare)));
} else {
    store = createStore(rootReducer, compose(applyMiddleware(...middleWare)));
}


export default store;