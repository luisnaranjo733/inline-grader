import React, { Component } from 'react';
import {Link} from 'react-router';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

var xml2js = require('xml2js');

var RUBRIC_TAG = 'rubric';
var SECTION_TAG = 'section';
var CRITERIA_TAG = 'criteria';

class Rubric {
  constructor(dom) {
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
    var rubricTag = this.dom[RUBRIC_TAG];
    if (rubricTag) {
      var rubricName = rubricTag['$']['name'];
      if (rubricName) {
        return true;
      }
    }
    return false;
  }

  organize() {
    var rubricTag = this.dom[RUBRIC_TAG];
    this.rubric['name'] = rubricTag['$']['name'];

    if (rubricTag[SECTION_TAG]) {
      for (var section of rubricTag[SECTION_TAG]) {
        this.organizeHelper(section, [section['$']['name']]); // kick off recursion for each top level section tree
      }
    }
  }

  organizeHelper(tag, path) {
    var childSections = tag[SECTION_TAG];
    var childCriteria = tag[CRITERIA_TAG];

    if (childSections) {
      for (var section of childSections) {
        this.organizeHelper(section, path.concat([section['$']['name']]));        
      }

    } else if (childCriteria) {
      for (var criteria of childCriteria) {
        this.rubric.criteria.push({
          name: criteria['$']['name'],
          path: path,
          weight: criteria['$']['weight'],
        });
      }
    }
  }

  printRubric() {
    for(var criteria of this.rubric.criteria) {
      console.log(criteria);
    }
  }
}

var url = "https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn25Fgw2pRc-VdivjVrXxr4mSu9EBMks5YFFB8wA%3D%3D";
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      var parser = new xml2js.Parser();
      parser.parseString(xmlHttp.responseText, function(err, result) {
        var rubric = new Rubric(result);
        console.log(rubric.rubric);
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