import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { portfolio } from './portfolio';
import { search } from './search';
import { cache } from './cache';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            portfolio,
            search,
            cache,
        }),
        applyMiddleware(thunk)
    )

    return store;
}