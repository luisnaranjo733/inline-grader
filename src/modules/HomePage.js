import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const Header = () => (
  <Jumbotron className="hidden-xs">
    <h1>Inline grader</h1>
    <p>Reference the rubric. Grade your students. Leave them comments. All in one place!</p>
    <p><Button bsStyle="primary">Learn more</Button></p>
  </Jumbotron>
);

const UploadRubricForm = ({url, urlChanged, formSubmitted}) => (
  <Form>
    <FormGroup>
      <ControlLabel>Submit rubric URL</ControlLabel>
      <FormControl
        type="text"
        value={url}
        placeholder="Enter rubric URL"
        onChange={urlChanged}
      />
      <FormControl.Feedback />
      <button type="button" onClick={formSubmitted} className="btn btn-default">Submit</button>
    </FormGroup>
  </Form>
);

UploadRubricForm.PropTypes = {
  url: PropTypes.string.isRequired,
  urlChanged: PropTypes.func.isRequired,
  formSubmitted: PropTypes.func.isRequired,
};

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <Header />
        <UploadRubricForm url={'google.com'} urlChanged={(url) => console.log(url)} formSubmitted={() => console.log('form submitted')}/>
      </div>
    );
  }
}
