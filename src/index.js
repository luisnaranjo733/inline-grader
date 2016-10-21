import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import CriteriaGrader from './CriteriaGrader';
import Home from './Home';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="criteriaGrader" component={CriteriaGrader} />
  </Router>,
  document.getElementById('root')
);
