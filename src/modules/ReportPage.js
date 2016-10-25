import React, { Component } from 'react';
import {Link} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';


class ReportPage extends Component {
  render() {
    return (
      <div>
        <h1>Report</h1>
        <br/><br/>
        <Link to="/">Home</Link>
      </div>
    );
  }
}


export default ReportPage ;