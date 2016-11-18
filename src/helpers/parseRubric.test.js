import {isXmlValid, parseXml} from './parseRubric';
import {readFileSync} from 'fs';

it('validates a valid xml rubric', () => {
    let fileContents = readFileSync('src/test-fixtures/pass/includes_all_features.xml', 'utf8');
    expect(isXmlValid(fileContents)).toBeTruthy();
});

it('invalidates a rubric with a criteria that has no weight', () => {
    let fileContents = readFileSync('src/test-fixtures/fail/criteria_missing_weight.xml', 'utf8');
    expect(isXmlValid(fileContents)).toBeFalsy();
});

it('invalidates a rubric with a criteria that has no name', () => {
    let fileContents = readFileSync('src/test-fixtures/fail/criteria_missing_name.xml', 'utf8');
    expect(isXmlValid(fileContents)).toBeFalsy();
});
