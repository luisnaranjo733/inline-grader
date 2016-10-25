var xml2js = require('xml2js');

class Rubric {
  constructor(xml) {
    // xml rubric tag name constants
    this._RUBRIC_TAG = 'rubric';
    this._SECTION_TAG = 'section';
    this._CRITERIA_TAG = 'criteria';

    // the name and criteria state are the "output" of the Rubric class
    this._name = ''; // rubric name
    this._criteria = []; // array of criteria objects
    // Criteria object attributes:
    //  - name: (criteria name)
    //  - path: (grading section path)
    //  - weight: (criteria points possible)

    if (xml) {
      // parse xml document
      var parser = new xml2js.Parser();
      parser.parseString(xml, function(error, result) {
          this._dom = result;
      }.bind(this));
      


      this._isXmlValidated = this._isXmlValid();
      if (this._isXmlValidated) {
        this._formatXml();
      } else {
        console.log("Warning: Invalid XML passed to Rubric()");
      }
    } else {
      console.log("Initialized empty rubric");
    }

  }

  // name and criteria getters can only be accessed after the xml rubric is validated with a positive result.
  get name() {
    // if (this._isXmlValidated) {
    //   return this._name;
    // } else {
    //   return 'Sorry, this xml is invalid';
    // }
    return this._name;
  }

  get criteria() {
    // if (this._isXmlValidated) {
    //   return this._criteria;
    // } else {
    //   return 'Sorry, this xml is invalid';
    // }
    return this._criteria;
  }

  // validate xml rubric recursively
  _isXmlValid() {
    var rubricTagValid = false;

    var rubricTag = this._dom[this._RUBRIC_TAG];
    if (rubricTag) {
      if (rubricTag['$']['name'] && rubricTag['$']['name'].length > 0) {
        if (rubricTag[this._SECTION_TAG] || rubricTag[this._CRITERIA_TAG]) {
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

    return rubricTagValid && this._isXmlValidRecursive(rubricTag);
  }

  // recursive helper method for xml rubric validation
  _isXmlValidRecursive(tag) {
    var childSections = tag[this._SECTION_TAG];
    var childCriteria = tag[this._CRITERIA_TAG];

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

        if (!section[this._SECTION_TAG] && !section[this._CRITERIA_TAG]) {
          allSectionTagsValid = false;
          console.log("All section tags must contain a criteria tag or a section tag");
        }

        allSectionTagsValid = this._isXmlValidRecursive(section);
      }
    }

    return allSectionTagsValid & allCriteriaTagsValid;
  }

  // format the xml rubric into a more useful format than the DOM, recursively
  _formatXml() {
    var rubricTag = this._dom[this._RUBRIC_TAG];
    this._name = rubricTag['$']['name'];
    this._formatXmlHelper(rubricTag, []);
  }

  // recursive helper method for xml rubric formatting
  _formatXmlHelper(tag, path) {
    var childSections = tag[this._SECTION_TAG];
    var childCriteria = tag[this._CRITERIA_TAG];

    if (childCriteria) {
      for (var criteria of childCriteria) {
        this._criteria.push({
          name: criteria['$']['name'],
          path: path,
          weight: criteria['$']['weight'],
          value: 0
        });
      }
    } 
    if (childSections) {
      for (var section of childSections) {
        this._formatXmlHelper(section, path.concat([section['$']['name']]));        
      }
    }
  }
}

export default Rubric;