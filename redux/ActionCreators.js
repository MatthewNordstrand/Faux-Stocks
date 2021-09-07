import * as ActionTypes from './ActionTypes';
import { STOCK_KEY, STOCK_URL } from '../shared/keys';

export const searchQuery = query => dispatch => {
    dispatch(searchLoading());

    return fetch(`${STOCK_URL}/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${STOCK_KEY}`)
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
    type: ActionTypes.SEARCH_ERROR,
    payload: errMess
});

export const updateCache = symbol => dispatch => {
    dispatch(updateProfile(symbol));
    //dispatch(updateStock(symbol));
};

export const updateProfile = symbol => dispatch => {
    return fetch(`${STOCK_URL}/profile/${symbol}?apikey=${STOCK_KEY}`)
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
    .then(profile => dispatch(addProfile(profile)))
    .catch(error => console.log(`ERROR(updateProfile): ${error.message}`));
};

export const addProfile = profileData => ({
    type: ActionTypes.CACHE_ADD_PROFILE,
    payload: profileData
});