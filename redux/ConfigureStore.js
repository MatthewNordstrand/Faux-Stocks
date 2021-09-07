import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { search } from './search';
import { cache } from './cache';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            search,
            cache,
        }),
        applyMiddleware(thunk)
    )

    return store;
}