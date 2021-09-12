import * as ActionTypes from './ActionTypes';

export const cache = (state = { stocks: [], profiles: [], errors: [] }, action) => {
    switch (action.type) {
        case ActionTypes.CACHE_ADD_PROFILE:
            return {...state, profiles: [...state.profiles.filter(profile => profile.symbol !== action.payload.symbol), action.payload]};

        case ActionTypes.CACHE_ADD_STOCK:
            return {...state, stocks: [...state.stocks.filter(stock => stock.symbol !== action.payload.symbol), action.payload]};
        
        case ActionTypes.CACHE_ERROR:
            return {...state, errors: [...state.errors.filter(error => error.symbol !== action.payload.symbol), action.payload]};

        default:
            return state;
    }
}