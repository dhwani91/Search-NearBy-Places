import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import reducers from './src/reducers';
import {Provider} from 'react-redux';

import './src/stylesheets/main.scss';


import Routes from './src/route.jsx';
const logger = createLogger({
  collapsed: true
});
let createStoreWithMiddleware;

  createStoreWithMiddleware = createStore(
    reducers,
    compose(applyMiddleware(logger))
  );

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <Provider store={createStoreWithMiddleware}>
      <Routes />
    </Provider>
  ), document.getElementById('app'));
});