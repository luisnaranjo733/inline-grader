import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import 'whatwg-fetch';

import {isXmlValid, parseXml} from '../helpers/parseRubric.js'
import {replaceRubric} from '../actions/'

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

export class HomePage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      rubricUrl: 'https://raw.githubusercontent.com/info343-au16/grading/xml/chat-rubric.xml?token=ABCn212kPw28h1PL15GB3Su7Cjh3IbeWks5YUNv1wA%3D%3D'
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
        outerThis.props.dispatch(replaceRubric(parsedXml.rubricName, parsedXml.criteria));
        outerThis.context.router.push('criteria/1'); // change router state
      } else {
        console.log('xml is NOT valid');
      }
    });
  }

  render() {
    return (
      <div id='home-page' className='container'>
        <Header />
        <UploadRubricForm rubricUrl={this.state.rubricUrl} onUrlChanged={this.onUrlChanged} onFormSubmitted={this.onFormSubmitted}/>
      </div>
    );
  }
}
HomePage.contextTypes = {router: React.PropTypes.object};

function mapStateToProps(state) {
  return {
    criteria: state.criteria,
    rubricName: state.rubricName
  }
}

export default connect(mapStateToProps)(HomePage);
