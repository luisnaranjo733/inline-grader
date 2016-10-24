import React from 'react';
import ReactDOM from 'react-dom';
import {Home} from './App';
import 'whatwg-fetch';

var semanticallyValidXml = 'https://raw.githubusercontent.com/luisnaranjo733/inline-grader/master/prototype-markup/accessibility-rubric.xml?token=ABCn26exuHdJkqOLGCO52H_0pPQCVXGeks5YFOoawA%3D%3D';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('Parses semantically valid xml correctly', () => {

  fetch(semanticallyValidXml)
  .then(function(response) {
      return response.text();
  })
  .then(function(body) {
      var rubric = new Rubric(body);
      expect(rubric.name).toEqual('Accessibility challenge rubric');
  })
});
