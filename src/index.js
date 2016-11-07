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
import reducer from './reducers'

const store = createStore(reducer)

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
