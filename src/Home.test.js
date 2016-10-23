import React from 'react';
import ReactDOM from 'react-dom';
import {Home, Rubric} from './Home';

var xml2js = require('xml2js');



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('Validates xml', () => {

  var url = 'https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn26exuHdJkqOLGCO52H_0pPQCVXGeks5YFOoawA%3D%3D';

  var xmlHttp = new XMLHttpRequest();
  console.log("Declaring callback");
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
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send(null);

});