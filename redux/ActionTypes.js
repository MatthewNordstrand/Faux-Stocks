export const SEARCH_QUERY = "SEARCH_QUERY";
export const SEARCH_LOADING = "SEARCH_LOADING";
export const SEARCH_UPDATE = "SEARCH_UPDATE";
export const SEARCH_ERROR = "SEARCH_ERROR";

export const CACHE_LOAD = "CACHE_LOAD"; //Called from the app to start the stock info loading
export const CACHE_UPDATE_STOCK = "CACHE_UPDATE_STOCK"; //Called from the reducer to get stock data from API
export const CACHE_ADD_STOCK = "CACHE_ADD_STOCK"; //Called when stock data retuns from API
export const CACHE_STOCK_FAILED = "CACHE_STOCK_FAILED";
export const CACHE_UPDATE_PROFILE = "CACHE_UPDATE_PROFILE"; //Called from the reducer to get company profile data from API
export const CACHE_ADD_PROFILE = "CACHE_ADD_PROFILE"; //Called when the profile data returns from the API
export const CACHE_PROFILE_FAILED = "CACHE_PROFILE_FAILED";