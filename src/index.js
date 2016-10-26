import './index.css'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Navigation from './Navigation'
import HomePage from './modules/HomePage'
import CriteriaPage from './modules/CriteriaPage'

render((
  <Router history={hashHistory}>
    <Route path="/" component={Navigation}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={HomePage}/>
      <Route path="/criteria/" component={CriteriaPage}>
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))