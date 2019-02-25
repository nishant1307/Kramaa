import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inititalState = {};

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
        persistedReducer,
        inititalState,
        compose(applyMiddleware(thunk)));

export let persistor = persistStore(store);
