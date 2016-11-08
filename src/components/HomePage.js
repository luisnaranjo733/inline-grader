import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import 'whatwg-fetch';
import Criterion from '../models/Criterion';
import {isXmlValid, parseXml} from '../helpers/parseRubric.js'
import {addRubric} from '../actions/'

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

  constructor(props, context) {
    super(props, context);
    this.state = {
      rubricUrl: 'https://raw.githubusercontent.com/info343-au16/grading/xml/sentiment-rubric.xml?token=ABCn25Nm4WEG2Qn8MJOdWrVxOa-nEIrrks5YK22iwA%3D%3D'
    };

    this.onUrlChanged = this.onUrlChanged.bind(this);
    this.onFormSubmitted = this.onFormSubmitted.bind(this);
    this.context = context;
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
      if (isXmlValid(xmlBody)) {
        var parsedXml = parseXml(xmlBody);
        console.log(parsedXml);

        // push parsedXml.rubricName to state (string)
        // push parsedXml.criteria to state (array of Criterion objects)

      } else {
        console.log('xml is NOT valid');
      }


      // var rubric = new Rubric(xmlBody);
      // if (rubric._isXmlValidated) {
      //   outerThis.props.dispatch(addRubric(rubric));
      //   outerThis.context.router.push('criteria/1'); // change router state
      // } else {
      //   console.log("XML not valid!")
      // }
    });
  }

  render() {
    var criteria;
    if (this.props.rubric) {
      criteria = this.props.rubric.name
    } else {
      criteria='empty'
    }

    return (
      <div>
        <Header />
        <UploadRubricForm rubricUrl={this.state.rubricUrl} onUrlChanged={this.onUrlChanged} onFormSubmitted={this.onFormSubmitted}/>
        <p>Rubric: {criteria}</p>
      </div>
    );
  }
}
HomePage.contextTypes = {router: React.PropTypes.object};

function mapStateToProps(state) {
  return {rubric: state.rubric}
}

export default connect(mapStateToProps)(HomePage);
