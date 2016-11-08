import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
  pathToCurrentCriteria: PropTypes.arrayOf(React.PropTypes.string).isRequired, // array of strings that represent the section path to the current criteria in rubric hierarchy
  currentCriteriaNumber: PropTypes.number.isRequired, // index + 1 value of current criteria being viewed/edited
  nTotalCriteria: PropTypes.number.isRequired // total # of criteria in this rubric
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
  criteriaTitle: PropTypes.string.isRequired, //parent state scalar
  criteriaPointsPossible: PropTypes.number.isRequired, // parent state scalar
  criteriaGradeChanged: PropTypes.func.isRequired, // callback in parent for when the grade changes
  criteriaCommentChanged: PropTypes.func.isRequired // callback in parent for when the comment changes
}

class CriteriaPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
  }

  componentWillMount() {
    // invoked once, before initial 'render'
    if (parseInt(this.props.params.criteriaIndex, 10)) {
      // retrieve current criteria index from url route parameter
      var currentCriteriaIndex = parseInt(this.props.params.criteriaIndex, 10) - 1;
      if (currentCriteriaIndex >= 0) {
        if (!this.props.rubric) {
          console.log('redirect to home, rubric has not been loaded yet');
          this.context.router.push('/');
        }
      } else {
        console.log('404 - url integer parameter must be from [0, inf]');
      }
    } else {
      console.log('404 - url must include an integer parameter');
    }
  }

  render() {
    var currentCriteriaIndex = parseInt(this.props.params.criteriaIndex, 10) - 1;

    var criteriaBodyProps = {
      criteriaTitle: '',
      criteriaPointsPossible: -1,
      criteriaGradeChanged: (e) => console.log(e.target.value),
      criteriaCommentChanged: (e) => console.log(e.target.value)
    }

    var toolBarProps = {
      pathToCurrentCriteria: ['section A', 'section B', 'section C'],
      currentCriteriaNumber: -1,
      nTotalCriteria: -1
    };

    if (this.props.rubric) {
      var currentCriteria = this.props.rubric.criteria[currentCriteriaIndex];

      criteriaBodyProps.criteriaTitle = currentCriteria.name;
      criteriaBodyProps.criteriaPointsPossible = parseInt(currentCriteria.weight, 10);

      toolBarProps.pathToCurrentCriteria = currentCriteria.path;
      toolBarProps.currentCriteriaNumber = currentCriteriaIndex + 1;
      toolBarProps.nTotalCriteria = this.props.rubric.criteria.length;
      console.log(currentCriteria);
    }

    

    return (
      <div>
        <Toolbar {...toolBarProps}/>
        <CriteriaBody {...criteriaBodyProps}/>
        
      </div>
    );
  }
}
CriteriaPage.contextTypes = {router: React.PropTypes.object};

function mapStateToProps(state) {
  return {rubric: state.rubric}
}

export default connect(mapStateToProps)(CriteriaPage);