import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Home from './components/home';
import EventDetails from './components/event';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/event/:id" component={EventDetails} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
