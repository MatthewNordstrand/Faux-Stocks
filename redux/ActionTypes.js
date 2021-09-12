export const SEARCH_QUERY = "SEARCH_QUERY";
export const SEARCH_LOADING = "SEARCH_LOADING";
export const SEARCH_UPDATE = "SEARCH_UPDATE";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const SEARCH_REMOVE = "SEARCH_REMOVE";

export const CACHE_LOAD = "CACHE_LOAD"; //Called from the app to start the stock info loading
export const CACHE_UPDATE_STOCK = "CACHE_UPDATE_STOCK"; //Called from the reducer to get stock data from API
export const CACHE_ADD_STOCK = "CACHE_ADD_STOCK"; //Called when stock data retuns from API
export const CACHE_UPDATE_PROFILE = "CACHE_UPDATE_PROFILE"; //Called from the reducer to get company profile data from API
export const CACHE_ADD_PROFILE = "CACHE_ADD_PROFILE"; //Called when the profile data returns from the API
export const CACHE_ERROR = "CACHE_ERROR";

export const PROFILE_STOCK_BUY = "PROFILE_STOCK_BUY";
export const PROFILE_STOCK_SELL = "PROFILE_STOCK_SELL";