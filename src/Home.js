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
    console.log('DOM');
    console.log(dom);
    this.rubric = {
      name: '',
      criteria: []
    };

    if (this.xmlIsValid()) {
      this.organize()
    }
  }

  xmlIsValid() {
    return true;
  }

  organize() {
    console.log(this.dom);
    var rubricTag = this.dom[this.RUBRIC_TAG];
    this.rubric['name'] = rubricTag['$']['name'];

    if (rubricTag[this.SECTION_TAG]) {
      for (var section of rubricTag[this.SECTION_TAG]) {
        this.organizeHelper(section, [section['$']['name']]); // kick off recursion for each top level section tree
      }
    }

  }

  organizeHelper(tag, path) {
    var childSections = tag[this.SECTION_TAG];
    var childCriteria = tag[this.CRITERIA_TAG];

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

var url = "https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn22r6-LhpyKJQx3hhN2LCKlySq6X1ks5YFOXgwA%3D%3D";
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      var parser = new xml2js.Parser();
      parser.parseString(xmlHttp.responseText, function(err, result) {
        console.log('err');
        console.log(err);
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