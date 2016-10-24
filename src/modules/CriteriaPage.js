import React, { Component } from 'react';
//import Rubric from './Rubric';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Breadcrumb} from 'react-bootstrap'
//import {Link} from 'react-router';

class BreadCrumbs extends Component {
  render() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Data
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

class ProgressBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCriteria: 0,
      totalCriteria: 52
    }
  }
  render() {
    return (
      <span className="pull-right progress-box">
        Criteria: {this.state.currentCriteria} / {this.state.totalCriteria}
      </span>
    );
  }
}


class ToolBar extends Component {
  render() {
    return (
      <div className="criteria-toolBar">
        <BreadCrumbs />
        <ProgressBox />
      </div>
    );
  }
}

class Body extends Component {
  render() {
    return (
      <div>
        <p>Content body goes here</p>
      </div>
    );
  }
}

class CriteriaPage extends Component {

  render() {
    return (
      <div className="criteria-page">
        <ToolBar />
        <Body />
      </div>
      
    );
  }
}

export default CriteriaPage;

