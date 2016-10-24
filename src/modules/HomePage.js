import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
// import {Link} from 'react-router';
import 'whatwg-fetch';



class Header extends Component {
  render() {
    return (
      <Jumbotron className="hidden-xs">
        <h1>Inline grader</h1>
        <p>Reference the rubric. Grade your students. Leave them comments. All in one place!</p>
        <p><Button bsStyle="primary">Learn more</Button></p>
      </Jumbotron>
    );
  }
}
class UploadRubricForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn26exuHdJkqOLGCO52H_0pPQCVXGeks5YFOoawA%3D%3D'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }
  
  handleSubmit(e) {
    var outerThis = this;
    fetch(this.state.url)
    .then(function(response) {
        return response.text();
    })
    .then(function(xmlBody) {
        outerThis.props.onAddRubric(xmlBody);
    });
  }

  render() {
    var formGroupStyle = {
      margin: "1em"
    };
    var formControlStyle = {
      marginTop: "1em",
      marginBottom: "1em"
    };

    return (
      <Form>
        <FormGroup
          controlId="rubricLinkInput"
          style={formGroupStyle}
        >
          <ControlLabel>Submit rubric URL</ControlLabel>
          <FormControl
            type="text"
            value={this.state.url}
            placeholder="Enter rubric URL"
            onChange={this.handleChange}
            style={formControlStyle}
          />
          <FormControl.Feedback />
          <button type="button" onClick={this.handleSubmit} className="btn btn-default">Submit</button>
        </FormGroup>
      </Form>
    );
  }
}

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        <UploadRubricForm onAddRubric={this.props.onAddRubric} />
      </div>
    );
  }
}


export default HomePage ;