import React, { Component } from 'react';
import {Link} from 'react-router';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

var parseString = require('xml2js').parseString;

function validateXML(parsedXML) {
  console.log(parsedXML);
  /*
	• <rubric> rules
		○ Root tag must be a <rubric> tag.
		○ <rubric> tag must have a "name" attribute.
	• <section> rules
		○ All <section> tags must have a "name" attribute
		○ All <section> tags must have 1 or more child tags
		○ All <section> tags must satisfy one of the following rules
			§ All direct children are <criteria> tags
			§ All direct children are <section> tags
		
	• <criteria> rules
		○ All <criteria> tags must have "name" attribute.
		○ All <criteria> tags must have "weight" attribute.
  */


}

var url = "https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn25Fgw2pRc-VdivjVrXxr4mSu9EBMks5YFFB8wA%3D%3D";
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      parseString(xmlHttp.responseText, function(err, result) {
        console.log(result);
      });
    }
        
}
xmlHttp.open("GET", url, true); // true for asynchronous 
xmlHttp.send(null);

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
      url: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const length = this.state.url.length;
    if (length > 0) return 'success';
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }
  
  handleSubmit(e) {

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
          validationState={this.getValidationState()}
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



class Home extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <UploadRubricForm />
        <Link to="criteriaGrader">Criteria</Link>
      </div>
    );
  }
}

export default Home;