import React, { Component } from 'react';
//import Rubric from './Rubric';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
//import {Link} from 'react-router';


class Criteria extends Component {

  render() {
    return (
      <h1>Criteria: {this.props.params.position}</h1>
    );
  }
}

export default Criteria;

