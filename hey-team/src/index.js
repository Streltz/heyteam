import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import './dist/bootstrap/css/bootstrap.min.css';

const store = createStore(rootReducer, applyMiddleware(thunk)) 

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
