import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/lib/integration/react'
import App from './App'
import store from "./components/redux/store"
import './index.css'

let persister = persistStore(store);
ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <PersistGate persistor={persister} loading={null}>
            <App />
        </PersistGate>
    </Provider>
)
