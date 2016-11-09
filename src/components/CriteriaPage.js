import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {updateCriterionGrade, updateCriterionComment} from '../actions/'

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

const CriteriaBody = ({criterion, pointsEarned, criteriaGradeChanged, criteriaCommentChanged}) => (
    <div className='criteria-body'>
        <p className='center-block'>{criterion.name} ({criterion.pointsPossible})</p>
        <p>{criterion.description}</p>
        <div>
            <label htmlFor="grade">Grade</label><br />
            <input autoFocus type="text" id="grade" name="grade" value={criterion.pointsEarned} onChange={criteriaGradeChanged} />
        </div>

        <div>
            <label htmlFor="comment">Comment</label><br/>
            <textarea id="comment" name="comment" value={criterion.comment} onChange={criteriaCommentChanged}></textarea>
        </div>
    </div>
)

class CriteriaPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.state = {
      pointsEarned: 0,
      comment: '' 
    }

    this.onCriteriaGradeChanged = this.onCriteriaGradeChanged.bind(this);
    this.onCriteriaCommentChanged = this.onCriteriaCommentChanged.bind(this);

    this.onNavigateUp = this.onNavigateUp.bind(this);
    this.onNavigateDown = this.onNavigateDown.bind(this);
    this.onNavigateLeft = this.onNavigateLeft.bind(this);
    this.onNavigateRight = this.onNavigateRight.bind(this);
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
    var currentCriterionIndex = parseInt(this.props.params.criteriaIndex, 10) - 1;
    this.props.dispatch(updateCriterionGrade(currentCriterionIndex, e.target.value));
  }

  onCriteriaCommentChanged(e) {
    var currentCriterionIndex = parseInt(this.props.params.criteriaIndex, 10) - 1;
    this.props.dispatch(updateCriterionComment(currentCriterionIndex, e.target.value));
  }

  onNavigateUp(e) {
    this.context.router.push(`/report/${this.props.params.criteriaIndex}`);
  }

  onNavigateDown(e) {
  }

  onNavigateLeft(e) {
    var previousCriterionNumber = parseInt(this.props.params.criteriaIndex, 10) - 1;
    if (previousCriterionNumber > 0) {
      this.context.router.push(`/criteria/${previousCriterionNumber}`);
    }
  }

  onNavigateRight(e) {
    var nextCriterionNumber = parseInt(this.props.params.criteriaIndex, 10) + 1;
    if (nextCriterionNumber <= this.props.criteria.length) {
      this.context.router.push(`/criteria/${nextCriterionNumber}`);
    }
  }
  
  render() {
    var currentCriterionNumber = parseInt(this.props.params.criteriaIndex, 10);
    var criterion = this.props.criteria[currentCriterionNumber - 1]; // todo: range error handling

    const keyboardEvents = {
      keyMap: {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right'
      },
      handlers: {
        up: this.onNavigateUp,
        down: this.onNavigateDown,
        left: this.onNavigateLeft,
        right: this.onNavigateRight
      }
    }

    return (
      <HotKeys keyMap={keyboardEvents.keyMap} handlers={keyboardEvents.handlers}>
        <Toolbar 
          criterion={criterion}
          currentCriterionNumber={currentCriterionNumber}
          nCriterion={this.props.criteria.length}
        />
        <CriteriaBody
          criterion={criterion}
          pointsEarned={this.state.pointsEarned}
          criteriaGradeChanged={this.onCriteriaGradeChanged}
          criteriaCommentChanged={this.onCriteriaCommentChanged}
        />
      </HotKeys>
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

const keyMap = {
  left: 'left',
  right: 'right'
}