import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App';
import HomePage from './modules/HomePage'
import CriteriaPage from './modules/CriteriaPage'
import ReportPage from './modules/ReportPage'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

let store = createStore(counter);

store.subscribe(() =>
  console.log(store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' }) 
// 1

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="/criteria/:criteriaIndex" component={CriteriaPage}/>
        <Route path="/report" component={ReportPage}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
