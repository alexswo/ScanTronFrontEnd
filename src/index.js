import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authentication as rootReducer } from './reducers';
import { Routes } from './routes';
import * as serviceWorker from './serviceWorker';
import LoginView from './views/LoginView'

import 'bootstrap/dist/css/bootstrap.min.css';
import './shards.min.css';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
      <Route path='/login' component={ LoginView } />
    </Router>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
