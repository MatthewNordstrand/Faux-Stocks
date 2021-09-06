import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { search } from './search';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            search,
        }),
        applyMiddleware(thunk)
    )

    return store;
}