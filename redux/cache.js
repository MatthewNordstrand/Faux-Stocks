import * as ActionTypes from './ActionTypes';

export const cache = (state = { stocks: [], profiles: [] }, action) => {
    switch (action.type) {
        case ActionTypes.CACHE_ADD_PROFILE:
            return {...state, profiles: [...profiles.filter(profile => profile.symbol != action.payload.symbol), action.payload]};

        default:
            return state;
    }
}