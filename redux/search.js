import * as ActionTypes from './ActionTypes';

export const search = (state = { isLoading: false, errMess: "Search above to see stocks.", stocks: [] }, action) => {
    switch (action.type) {
        case ActionTypes.SEARCH_LOADING:
            return {...state, isLoading: true, errMess: null, stocks: []};

        case ActionTypes.SEARCH_UPDATE:
            return {...state, isLoading: false, errMess: null, stocks: action.payload};

        case ActionTypes.SEARCH_ERROR:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};