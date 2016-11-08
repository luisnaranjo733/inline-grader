var xml2js = require('xml2js');

const RUBRIC_TAG = 'rubric';
const SECTION_TAG = 'section';
const CRITERIA_TAG = 'criteria';


/* Check if an xml string contains semantically valid xml
Input: A string that represents an xml DOM
Output: Boolean value indicated semantic validity

Preconditions:
  * The xml string is syntactically valid

*/
export function isXmlValid(xmlString) {

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

}

