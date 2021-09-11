import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { portfolio } from './portfolio';
import { search } from './search';
import { cache } from './cache';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["portfolio"]
};

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            portfolio,
            search,
            cache,
        }),
        applyMiddleware(thunk)
    );

    const persistor = persistStore(store);

    return {persistor, store};
}