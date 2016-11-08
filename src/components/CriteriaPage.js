import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const Toolbar = ({criterion, currentCriterionNumber, nCriterion}) => (
    <div className="criteria-toolBar">
        <ul>
          {criterion.sectionPath.map((section, i) => 
              <li key={i}>{section}</li>
            )
          }
        </ul>

        <p>Criteria: {currentCriterionNumber} / {nCriterion}</p>
    </div>
);
// Toolbar.propTypes = {
//   pathToCurrentCriteria: PropTypes.arrayOf(React.PropTypes.string).isRequired, // array of strings that represent the section path to the current criteria in rubric hierarchy
//   currentCriteriaNumber: PropTypes.number.isRequired, // index + 1 value of current criteria being viewed/edited
//   nTotalCriteria: PropTypes.number.isRequired // total # of criteria in this rubric
// };


const CriteriaBody = ({criterion, criteriaGradeChanged, criteriaCommentChanged}) => (
    <div className='criteria-body'>
        <p className='center-block'>{criterion.name} ({criterion.pointsPossible})</p>
        <p>{criterion.description}</p>
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
// CriteriaBody.propTypes = {
//   criteriaTitle: PropTypes.string.isRequired, //parent state scalar
//   criteriaDesc: PropTypes.string.isRequired,
//   criteriaPointsPossible: PropTypes.number.isRequired, // parent state scalar
//   criteriaGradeChanged: PropTypes.func.isRequired, // callback in parent for when the grade changes
//   criteriaCommentChanged: PropTypes.func.isRequired // callback in parent for when the comment changes
// }

class CriteriaPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
  }

  componentWillMount() {
    // invoked once, before initial 'render'
    if (parseInt(this.props.params.criteriaIndex, 10)) {
      // retrieve current criteria index from url route parameter
      var currentCriterionNumber = parseInt(this.props.params.criteriaIndex, 10);
      if (currentCriterionNumber > 0) {
        if (!this.props.criteria) {
          console.log('redirect to home, rubric has not been loaded yet');
          this.context.router.push('/');
        }
      } else {
        console.log('404 - url integer parameter must be from [1, inf]');
      }
    } else {
      console.log('404 - url must include an integer parameter');
    }
  }

  onCriteriaGradeChanged(e) {
    console.log(e.target.value);
    var currentCriterionNumber = parseInt(this.props.params.criteriaIndex, 10);
    //this.props.dispatch(updateCriteriaGrade(currentCriteriaIndex, e.target.value));
  }

  onCriteriaCommentChanged(e) {
    console.log(e.target.value)
  }

  render() {
    var currentCriterionNumber = parseInt(this.props.params.criteriaIndex, 10);
    var criterion = this.props.criteria[currentCriterionNumber - 1]; // todo: range error handling
    console.log(criterion);

    

    return (
      <div>
        <Toolbar 
          criterion={criterion}
          currentCriterionNumber={currentCriterionNumber}
          nCriterion={this.props.criteria.length}
        />
        <CriteriaBody
          criterion={criterion}
          criteriaGradeChanged={this.onCriteriaGradeChanged}
          criteriaCommentChanged={this.onCriteriaCommentChanged}
        />
      </div>
    );
  }
}
CriteriaPage.contextTypes = {router: React.PropTypes.object};

function mapStateToProps(state) {
  return {
    criteria: state.criteria,
    rubricName: state.rubricName
  }
}

export default connect(mapStateToProps)(CriteriaPage);