import * as ActionTypes from './ActionTypes';
import { STOCK_KEY, STOCK_URL } from '../shared/keys';

export const searchQuery = query => dispatch => {
    dispatch(searchLoading());

    return fetch(`${STOCK_URL}/search?query=${query}&limit=10&apikey=${STOCK_KEY}`)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        })
    .then(response => response.json())
    .then(stocks => dispatch(searchUpdate(stocks)))
    .catch(error => dispatch(searchFailed(error.message)));
};

export const searchLoading = () => ({
    type: ActionTypes.SEARCH_LOADING
});

export const searchUpdate = stocks => ({
    type: ActionTypes.SEARCH_UPDATE,
    payload: stocks
});

export const searchFailed = errMess => ({
    type: ActionTypes.SEARCH_FAILED,
    payload: errMess
});