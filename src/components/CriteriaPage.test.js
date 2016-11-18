import React from 'react';
import ReactDOM from 'react-dom';
import {readFileSync} from 'fs';
import Criterion from '../models/Criterion';
import {isXmlValid, parseXml} from '../helpers/parseRubric';
import ConnectedCriteriaPage, {CriteriaPage} from './CriteriaPage';

var redux_and_router_params = {};

beforeAll(function() {
  redux_and_router_params['params'] = {
      criteriaIndex: '1'
  };

  let fileContents = readFileSync('src/test-fixtures/pass/includes_all_features.xml', 'utf8');
  Object.assign(redux_and_router_params, parseXml(fileContents));
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CriteriaPage {...redux_and_router_params} />, div);
});