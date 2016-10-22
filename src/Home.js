import React, { Component } from 'react';
import {Link} from 'react-router';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

var xml2js = require('xml2js');



class Rubric {
  constructor(dom) {
    this.RUBRIC_TAG = 'rubric';
    this.SECTION_TAG = 'section';
    this.CRITERIA_TAG = 'criteria';

    this.dom = dom;
    this.rubric = {
      name: '',
      criteria: []
    };

    if (this.xmlIsValid()) {
      this.organize()
    }
  }

  xmlIsValid() {
    /*
      * Root tag should be rubric
      * Rubric tag should have name attribute
      * Rubric tag must have at least 1 criteria or section tag as immediate children
      * Traverse tree
        - Criteria tags must have
          * name attribute
          * weight attribute
        - Section tags must have
          * name attribute
          * At least 1 criteria or section tag as immediate children
    */
    return true;
  }

  organize() {
    var rubricTag = this.dom[this.RUBRIC_TAG];
    this.rubric['name'] = rubricTag['$']['name'];
    this.organizeHelper(rubricTag, []);
  }

  organizeHelper(tag, path) {
    var childSections = tag[this.SECTION_TAG];
    var childCriteria = tag[this.CRITERIA_TAG];

    if (childCriteria) {
      for (var criteria of childCriteria) {
        this.rubric.criteria.push({
          name: criteria['$']['name'],
          path: path,
          weight: criteria['$']['weight'],
        });
      }
    } 
    if (childSections) {
      for (var section of childSections) {
        this.organizeHelper(section, path.concat([section['$']['name']]));        
      }
    }
  }

  printRubric() {
    for(var criteria of this.rubric.criteria) {
      console.log(criteria);
    }
  }
}

var url = "https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn26exuHdJkqOLGCO52H_0pPQCVXGeks5YFOoawA%3D%3D";
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      var parser = new xml2js.Parser();
      parser.parseString(xmlHttp.responseText, function(err, result) {
        if (err) {
          console.log("XML PARSING ERROR: " + err);
        } else {
          var rubric = new Rubric(result);
          rubric.printRubric();
        }
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