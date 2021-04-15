// Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
// Redux router
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';

// Reducer imports
import routerReducer, { reducerName as routerReducerName } from './pages/router/routerReducer';
import rocketReducer, { reducerName as rocketReducerName } from './pages/rockets/rocketReducer';

// Middlewares
import errorReporterMiddleware from './middlewares/errorReporterMiddleware';
import axiosSettingsSetterMiddleware from './middlewares/axiosSettingsSetterMiddleware';

// Axios
import axios from './api/axios';

// Persistence
import merge from 'lodash/merge';
import LocalStorage from './localStorageStore';

// Util
import util from '../client/util';

// Compose enhancers
const composeEnhancers =
	process.env.NODE_ENV === 'production'
		? null || compose
		: (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const history = util.isServer() ? createMemoryHistory({ initialEntries: ['/'] }) : createBrowserHistory();

// Root reducer
const rootReducer = combineReducers({
	router: connectRouter(history),
	form: formReducer,
	[routerReducerName]: routerReducer,
	[rocketReducerName]: rocketReducer,
});

// Use preloaded state from ssr
let preloadedState = {};
if (!util.isServer()) {
	const serverPreloadedState = window.__PRELOADED_STATE__;
	delete window.__PRELOADED_STATE__;
	preloadedState = merge(LocalStorage.getReduxState(), serverPreloadedState);
}

// Middlewares
const middleware = [
	thunk.withExtraArgument({ api: axios }),
	routerMiddleware(history),
	errorReporterMiddleware,
	axiosSettingsSetterMiddleware,
];

// Store creator
const store = () => createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)));

export { history, store };
