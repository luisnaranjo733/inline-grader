import React, { Component } from 'react';
//import Rubric from './Rubric';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
//import {Link} from 'react-router';

class BreadCrumbs extends Component {
  render() {
    return (
      <span>
        <p>BreadCrumbs</p>
      </span>
    );
  }
}

class ProgressBox extends Component {
  render() {
    return (
      <span>
        <p>Criteria: this.props.params.position</p>
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

