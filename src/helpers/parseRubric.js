// var xml2js = require('xml2js');
import xml2js from 'xml2js';
import Criterion from '../models/Criterion';

const RUBRIC_TAG = 'rubric';
const SECTION_TAG = 'section';
const CRITERIA_TAG = 'criteria';

// helper method to convert xmlString into xml2js dom object
function stringToDom(xmlString) {
  var parser = new xml2js.Parser();
  var dom;
  parser.parseString(xmlString, function(error, result) {
    if (error) {
      throw error;
    }
    dom = result;
  })
  return dom;
}

/* Check if an xml string contains semantically valid xml
Input: A string that represents an xml DOM
Output: Boolean value indicated semantic validity

Preconditions:
  * The xml string is syntactically valid

Approach:
  * Test it the root rubric tag is semantically valid
  * Test if it has at least one section tag child or at least one criteria tag child
  * Recursively test if the rubric tag's children are semantically valid

*/
export function isXmlValid(xmlString) {
  var dom = stringToDom(xmlString);

  var rubricTagValid = false;

  var rubricTag = dom[RUBRIC_TAG];
  if (rubricTag) {
    if (rubricTag['$']['name'] && rubricTag['$']['name'].length > 0) {
      if (rubricTag[SECTION_TAG] || rubricTag[CRITERIA_TAG]) {
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

  return rubricTagValid && isXmlValidHelper(rubricTag);
}

/* Recursive helper method for xml rubric validation
Input: A rubric tag, section tag, or criteria tag
Output: Boolean which determines if the provided tag's descendants are semantically valid

Approach:
  * Check if all childSections are semantically valid (if present)
  * Check if all childCriteria are semantically valid (if present)
  * Recurse

*/
function isXmlValidHelper(tag) {
  var childSections = tag[SECTION_TAG];
  var childCriteria = tag[CRITERIA_TAG];

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

      if (!section[SECTION_TAG] && !section[CRITERIA_TAG]) {
        allSectionTagsValid = false;
        console.log("All section tags must contain a criteria tag or a section tag");
      }

      allSectionTagsValid = isXmlValidHelper(section);
    }
  }

  return allSectionTagsValid & allCriteriaTagsValid;
}



/*  Parse an xml string
Input: A string that represents an xml DOM
Output: {
  rubricName: 'Rubric name'.
  criteria: array of Criterion objects (models/Criterion.js)
}

Preconditions:
  * isXmlValid(xmlString) === true

*/
export function parseXml(xmlString) {
  var rubric = {
    rubricName: '',
    criteria: []
  }

  var dom = stringToDom(xmlString);
  var rubricTag = dom[RUBRIC_TAG];
  rubric.rubricName = rubricTag['$']['name'];

  parseXmlHelper(rubricTag, [], rubric.criteria);

  return rubric;
}


// // recursive helper method for xml rubric formatting
function parseXmlHelper(tag, path, criteriaArray) {
  var childSections = tag[SECTION_TAG];
  var childCriteria = tag[CRITERIA_TAG];

  if (childCriteria) {
    for (var criteria of childCriteria) {
      var criterion = new Criterion(
        criteria['$']['name'],   //name
        '',                      // description
        parseInt(criteria['$']['weight'], 10), // pointsPossible
        path                     // sectionPath
      );
      criteriaArray.push(criterion);
    }
  } 
  
  if (childSections) {
    for (var section of childSections) {
      parseXmlHelper(section, path.concat([section['$']['name']]), criteriaArray);        
    }
  }

}