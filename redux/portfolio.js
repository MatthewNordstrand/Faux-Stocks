import * as ActionTypes from './ActionTypes';

export const portfolio = (state = { money: 25000, stocks: [] }, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

/*
    How stocks store information here:
    {
        symbol,
        amount, (of stocks owned)
        moneySpent, (on stocks)
    }
*/