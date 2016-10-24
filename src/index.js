import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Nav from './Nav'
import HomePage from './modules/HomePage'
import CriteriaPage from './modules/CriteriaPage'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Nav}>

      {/* add it here, as a child of `/` */}
      <IndexRoute component={HomePage}/>
      <Route path="/criteria/:position" component={CriteriaPage} />
    </Route>
  </Router>
), document.getElementById('root'))