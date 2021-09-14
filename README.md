# Faux-Stocks
Faux Stocks is a stock trading game that that uses real-world information from real stocks to buy and sell imaginary versions of the same stocks.

I wanted to create this app because I am personally fascinated by the stock market and wanted to interact with a Stock API in an interesting way. A stock game seemed like a good choice.

## Technologies Used

### Languages, Frameworks, and Libraries
* React Native
* Javascript

### [Financial Modeling Prep API](https://financialmodelingprep.com/developer/docs)
* Provides access to realtime stock data.
* Searching provided by the "/search" endpoint.
* Detailed company information provided by the "/profile" endpoint.
* Historical price data provided by the historical "/15minute" endpoint.
  * 15 minutes is the time between each point of data.

### [React Native Chart Kit](https://www.npmjs.com/package/react-native-chart-kit)
* I manipulate the data provided from FMP's "/15minute" endpoint to provide a graph to display stock performance for all stocks for the last 5 days.
* The chart component that I have created is modular and can show lots of data on a large chart, or less data on a smaller chart with simply changing a few props.

### [Redux](https://redux.js.org/)
* Provides state management for information that needs to be retained globally.
* redux-thunk middleware is used to allow extra processing before information is brought to the reducer.
  * Specifically, when requesting data from the FMP API, Thunk waits on a promise to resolve before sending the stock data to the reducer to be added to the store.

## Notible Pieces of Code

[Weelkly Performance Chart Component](https://github.com/MatthewNordstrand/Faux-Stocks/blob/master/Components/StatPanels/WeeklyPerformanceChart.js) - The component that draws all of the charts I am using in the app.

[Stock Details Page](https://github.com/MatthewNordstrand/Faux-Stocks/blob/master/Components/Pages/ViewStockPage.js) - This component gets all of the stock details from the redux store, and if it doesnt's exist, it creates a redux-thunked request for the data.

[Redux Action Creators](https://github.com/MatthewNordstrand/Faux-Stocks/blob/master/redux/ActionCreators.js) - It requires a lot of Redux Actions to allow an API-driven app to function.

[Cache Redux Reducer](https://github.com/MatthewNordstrand/Faux-Stocks/blob/master/redux/cache.js) - One very important thing to note is that ability to replace old data from the store when new data comes in, like when I re-check the value of a stock. That process is done very elegantly within this reducer file.

## Screenshots

One thing that I would like to note are that the graphs from the first and the second screenshot are the exact same component. I just change a couple of props and I can re-use it as a small graph to give a preview of stock performance on the search page or a large gragh on the stock details pages.

### Stock Details Page
![Example of Stock Details Page](https://www.mattnordstrand.com/res/projects/fauxstocks/1.png)

### Stock Search Page
![Stock Search Page](https://www.mattnordstrand.com/res/projects/fauxstocks/3.png)

### Portfolio Details Page
![Portfolio Details Page](https://www.mattnordstrand.com/res/projects/fauxstocks/2.png)