import * as ActionTypes from './ActionTypes';

export const portfolio = (state = { money: 25000, stocks: [] }, action) => {
    switch (action.type) {
        case ActionTypes.PROFILE_STOCK_BUY:
            const {symbol, count, price} = action.payload;
            let ownedStock = state.stocks.filter(stock => stock.symbol === symbol)[0];

            //Create new or update current owned stock reference
            if (!ownedStock) {
                ownedStock = {
                    symbol: symbol,
                    amount: count,
                    cost: price
                };
            } else {
                ownedStock.amount += count;
                ownedStock.cost += price;
            }

            //Return state with updated stock reference and money amount
            return {...state, money: state.money - price, stocks: [...state.stocks.filter(stock => stock.symbol !== symbol), ownedStock]};

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