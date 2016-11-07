import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import 'whatwg-fetch';

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

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rubricUrl: 'https://raw.githubusercontent.com/info343-au16/grading/xml/sentiment-rubric.xml?token=ABCn24GwMCN_cQhCkHoLSmDS8qgemC1Bks5YI1bCwA%3D%3D'
    };

    this.onUrlChanged = this.onUrlChanged.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
  }

  onUrlChanged(event) {
    this.setState({rubricUrl: event.target.value});
  }

  onFormSubmitted(event) {
    var outerThis = this;
    fetch(this.state.rubricUrl)
    .then(function(response) {
        return response.text();
    })
    .then(function(xmlBody) {
      console.log(xmlBody);
    });
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

function mapStateToProps(state) {
  return {questions: state.questions}
}

export default connect(mapStateToProps)(HomePage);
