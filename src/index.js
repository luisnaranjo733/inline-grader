import React from 'react';
import ReactDOM from 'react-dom';
import {Home, CriteriaGrader} from './App';

import { Router, Route, hashHistory} from 'react-router';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}/>
    <Route path="criteriaGrader" component={CriteriaGrader} />
  </Router>,
  document.getElementById('root')
);
