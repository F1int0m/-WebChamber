import React from 'react';
import ReactDOM from 'react-dom/client';
import './view/style/index.module.css';
import App from './App';
import reportWebVitals from './system/reportWebVitals';
import {store} from './store/store'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*catch*/ function (error) {
        console.log('Service worker registration failed:', error);
    });
} else {
    console.log('Service workers are not supported.');
}

// root.render(
//     <BrowserRouter>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </BrowserRouter>
// );

reportWebVitals();
