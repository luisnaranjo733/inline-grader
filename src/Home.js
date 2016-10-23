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
  }

  isXmlValid() {
    var rubricTagValid = false;

    var rubricTag = this.dom[this.RUBRIC_TAG];
    if (rubricTag) {
      if (rubricTag['$']['name'] && rubricTag['$']['name'].length > 0) {
        if (rubricTag[this.SECTION_TAG] || rubricTag[this.CRITERIA_TAG]) {
          rubricTagValid = true;
        } else {
          console.log('Rubric tag must contain at least 1 criteria or section tag as immediate child');
        }
      } else {
        console.log('Rubric tag should have a name attribute')
      }
    } else {
      console.log("Root tag should be a rubric tag");
    }

    return rubricTagValid && this.isXmlValidRecursive(rubricTag);
  }

  isXmlValidRecursive(tag) {
    var childSections = tag[this.SECTION_TAG];
    var childCriteria = tag[this.CRITERIA_TAG];

    var allSectionTagsValid = true;
    var allCriteriaTagsValid = true;

    if (childCriteria) {
      for (var criteria of childCriteria) {
        if (!criteria['$']['name'] || criteria['$']['name'].length === 0) {
          allCriteriaTagsValid = false;
          console.log("All criteria tags should have a non empty name attribute");
        }
      }
    } 

    if (childSections) {
      for (var section of childSections) {
        if (!section['$']['name'] || section['$']['name'].length === 0) {
          allSectionTagsValid = false;
          console.log("All section tags should have a non empty name attribute");
        }

        if (!section[this.SECTION_TAG] && !section[this.CRITERIA_TAG]) {
          allSectionTagsValid = false;
          console.log("All section tags must contain a criteria tag or a section tag");
        }

        allSectionTagsValid = this.isXmlValidRecursive(section);
      }
    }

    return allSectionTagsValid & allCriteriaTagsValid;
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

//var url = "https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn26exuHdJkqOLGCO52H_0pPQCVXGeks5YFOoawA%3D%3D";


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
      url: 'https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn26exuHdJkqOLGCO52H_0pPQCVXGeks5YFOoawA%3D%3D'
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
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          var parser = new xml2js.Parser();
          parser.parseString(xmlHttp.responseText, function(err, result) {
            if (err) {
              console.log("XML PARSING ERROR: " + err);
            } else {
              var rubric = new Rubric(result);
              if (rubric.isXmlValid()) {
                console.log("XML is valid");
                rubric.organize();
                console.log("Organized rubric");
                console.log(rubric.rubric);
              } else {
                console.log("XML is NOT valid");
              }
            }
          });
        }
            
    }
    xmlHttp.open("GET", this.state.url, true); // true for asynchronous 
    xmlHttp.send(null);
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