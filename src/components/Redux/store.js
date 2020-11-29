import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import allReducer from './root.reducer';
import {persistStore} from 'redux-persist';

// import thunk from 'redux-thunk';
const middlewares = [logger];

if (process.env.NODE_ENV==='development'){
  middlewares.push(logger);
}

export const store = createStore(allReducer,
  applyMiddleware(...middlewares));


export const persistor = persistStore(store);
