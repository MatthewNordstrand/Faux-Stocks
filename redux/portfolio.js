import * as ActionTypes from './ActionTypes';

export const portfolio = (state = { money: 25000, stocks: [] }, action) => {
    switch (action.type) {
        case ActionTypes.PROFILE_STOCK_BUY:
            let ownedStockBuy = state.stocks.filter(stock => stock.symbol === action.payload.symbol)[0];

            //Create new or update current owned stock reference
            if (!ownedStockBuy) {
                ownedStockBuy = {
                    symbol: action.payload.symbol,
                    amount: action.payload.count,
                    cost: action.payload.price
                };
            } else {
                ownedStockBuy.amount += action.payload.count;
                ownedStockBuy.cost += action.payload.price;
            }

            //Return state with updated stock reference and money amount
            return {...state, money: state.money - action.payload.price, stocks: [...state.stocks.filter(stock => stock.symbol !== action.payload.symbol), ownedStockBuy]};

        case ActionTypes.PROFILE_STOCK_SELL:
            let ownedStockSell = state.stocks.filter(stock => stock.symbol === action.payload.symbol)[0];

            if (ownedStockSell) {
                ownedStockSell.amount -= action.payload.count;
                ownedStockSell.cost -= action.payload.price;
            }

            if (ownedStockSell.amount > 0) {
                //If we still own some stock, re-add the new stock value to state.
                return {...state, money: state.money + action.payload.price, stocks: [...state.stocks.filter(stock => stock.symbol !== action.payload.symbol), ownedStockSell]};
            } else {
                //If we don't own any stock anymore, don't re-add it to state.
                return {...state, money: state.money + action.payload.price, stocks: [...state.stocks.filter(stock => stock.symbol !== action.payload.symbol)]};
            }
        
        case ActionTypes.SETTINGS_RESET_DATA:
            return {...state, money: 25000, stocks: []};

        default:
            return state;
    }
};

/*
    How stocks store information here:
    {
        symbol,
        amount, (of stocks owned)
        cost, (money spent on these stocks)
    }
*/