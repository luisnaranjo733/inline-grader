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

const UploadRubricForm = ({rubricUrl, onUrlChanged, onFormSubmitted}) => (
  <Form>
    <FormGroup>
      <ControlLabel>Submit rubric URL</ControlLabel>
      <FormControl
        type="text"
        value={rubricUrl}
        placeholder="Enter rubric URL"
        onChange={onUrlChanged}
      />
      <FormControl.Feedback />
      <button type="button" onClick={onFormSubmitted} className="btn btn-default">Submit</button>
    </FormGroup>
  </Form>
);

UploadRubricForm.PropTypes = {
  rubricUrl: PropTypes.string.isRequired, // parent's url state
  onUrlChanged: PropTypes.func.isRequired, // callback to change parent's url state
  onFormSubmitted: PropTypes.func.isRequired, // callback for parent to know when the form is submitted (on button click)
};

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rubricUrl: 'google.com'
    };

    this.onUrlChanged = this.onUrlChanged.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }

  onUrlChanged(e) {
    this.setState({rubricUrl: e.target.value});
  }

  onFormSubmitted(e) {
    console.log("Form submitted");
    console.log(this.state.rubricUrl);
  }

  render() {
    return (
      <div>
        <Header />
        <UploadRubricForm rubricUrl={this.state.rubricUrl} onUrlChanged={this.onUrlChanged} onFormSubmitted={this.onFormSubmitted}/>
      </div>
    );
  }
}
