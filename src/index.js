import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App';
import HomePage from './components/HomePage'
import CriteriaPage from './components/CriteriaPage'
import ReportPage from './components/ReportPage'

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
