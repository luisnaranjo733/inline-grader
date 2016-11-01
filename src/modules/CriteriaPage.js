import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Jumbotron, Button, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const BreadCrumbs = ({sectionPath}) => (
  <ul>
    {sectionPath.map((section, i) => 
        <li key={i}>{section}</li>
      )
    }
  </ul>
)
BreadCrumbs.propTypes = {
    sectionPath: PropTypes.arrayOf(React.PropTypes.string).isRequired
}

const ProgressBox = ({numerator, denominator}) => (
    <p>Criteria: {numerator} / {denominator}</p>
)
ProgressBox.propTypes = {
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired
}

const Toolbar = () => (
    <div className="criteria-toolBar">
        <BreadCrumbs sectionPath={['a', 'b', 'c']} />
        <ProgressBox numerator={2} denominator={4}/>
    </div>
);


const CriteriaBody = ({
  criteriaTitle, criteriaPointsPossible, 
  criteriaGradeChanged, criteriaCommentChanged
}) => (
    <div className='criteria-body'>
        <p className='center-block'>{criteriaTitle} ({criteriaPointsPossible})</p>
        <div>
            <label htmlFor="grade">Grade</label><br />
            <input type="text" id="grade" name="grade" onChange={criteriaGradeChanged}/>
        </div>

        <div>
            <label htmlFor="comment">Comment</label><br/>
            <textarea id="comment" name="comment" onChange={criteriaCommentChanged}></textarea>
        </div>
    </div>
)
CriteriaBody.propTypes = {
  criteriaTitle: PropTypes.string.isRequired,
  criteriaPointsPossible: PropTypes.number.isRequired,
  criteriaGradeChanged: PropTypes.func.isRequired,
  criteriaCommentChanged: PropTypes.func.isRequired
}

export default class CriteriaPage extends Component {

  render() {
    var criteria = {
      criteriaTitle: 'Must have html5 doctype',
      criteriaPointsPossible: 1,
      criteriaGradeChanged: (e) => console.log(e.target.value),
      criteriaCommentChanged: (e) => console.log(e.target.value)
    }

    return (
      <div>
        <Toolbar />
        <CriteriaBody {...criteria}/>
      </div>
    );
  }
}