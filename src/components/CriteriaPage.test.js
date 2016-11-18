import React from 'react';
import ReactDOM from 'react-dom';
import {readFileSync} from 'fs';
import Criterion from '../models/Criterion';
import {isXmlValid, parseXml} from '../helpers/parseRubric';
import ConnectedCriteriaPage, {CriteriaPage} from './CriteriaPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  var params = {
      criteriaIndex: '1'
  };

  let fileContents = readFileSync('src/test-fixtures/pass/includes_all_features.xml', 'utf8');
  var rubric = parseXml(fileContents);

  ReactDOM.render(
    <CriteriaPage
      params={params}
      rubricName={rubric.rubricName}
      criteria={rubric.criteria}
    />, div);
});
