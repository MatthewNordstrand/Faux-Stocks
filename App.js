import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './Components/Loading';
import Main from './Components/Main';
import { ConfigureStore } from './redux/ConfigureStore'

const {persistor, store} = ConfigureStore();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    );
}
