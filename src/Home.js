import React, { Component } from 'react';
import {Link} from 'react-router';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

var parse = require('xml-parser');

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
  var root = parsedXML['root']; // root tag of xml document

  
  if (root['name'] === 'rubric') { 
    var rubricName = root['attributes']['name'];
    if (rubricName && rubricName.length > 0) {
      
      var topLevelSection = root['children'];
      topLevelSection.forEach(function(section) {
        console.log(section);
      });


    } else {

    }
  } else {
    // invalid xml, root tag should be of type <rubric>
  }

}

var url = "https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn22fxxKiAbfNrlrm5Y7wdisW1bGcPks5YFE6vwA%3D%3D";
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        var parsedXML = parse(xmlHttp.responseText);
        validateXML(parsedXML);
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
      url: 'https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric-notescaped.xml?token=ABCn23FAtD39Lfb7Lj3OgOxn8tN2rs9bks5YE7eQwA%3D%3D'
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