import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from './routes';
import * as serviceWorker from './serviceWorker';
import LoginView from './views/LoginView'

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards.min.css";

ReactDOM.render(
    <Router>
      {localStorage.getItem('user') && <Routes />}
      {!localStorage.getItem('user') && <Route path='/login' component={LoginView} loggingIn='false' />}
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
