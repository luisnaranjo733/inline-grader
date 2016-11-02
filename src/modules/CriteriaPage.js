import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const Toolbar = ({pathToCurrentCriteria, currentCriteriaNumber, nTotalCriteria}) => (
    <div className="criteria-toolBar">
        <ul>
          {pathToCurrentCriteria.map((section, i) => 
              <li key={i}>{section}</li>
            )
          }
        </ul>

        <p>Criteria: {currentCriteriaNumber} / {nTotalCriteria}</p>
    </div>
);
Toolbar.propTypes = {
  pathToCurrentCriteria: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  currentCriteriaNumber: PropTypes.number.isRequired,
  nTotalCriteria: PropTypes.number.isRequired
};


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
    var criteriaBodyProps = {
      criteriaTitle: 'Must have html5 doctype',
      criteriaPointsPossible: 1,
      criteriaGradeChanged: (e) => console.log(e.target.value),
      criteriaCommentChanged: (e) => console.log(e.target.value)
    }

    var toolBarProps = {
      pathToCurrentCriteria: ['section A', 'section B', 'section C'],
      currentCriteriaNumber: 12,
      nTotalCriteria: 56
    };

    return (
      <div>
        <Toolbar {...toolBarProps}/>
        <CriteriaBody {...criteriaBodyProps}/>
      </div>
    );
  }
}