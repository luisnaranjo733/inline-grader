import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Breadcrumb, FormGroup, ControlLabel, FormControl, Label} from 'react-bootstrap'
import {updateCriterionGrade, updateCriterionComment, addCriterionDefaultComment} from '../actions/'

class Toolbar extends Component {
  render() {
    return (
      <div id="criteria-toolbar">
        <Breadcrumb>
          {this.props.criterion.sectionPath.map((section, i) => 
              <Breadcrumb.Item key={i}>{section}</Breadcrumb.Item>
            )
          }
        </Breadcrumb>

        <Label className="pull-right" bsStyle={this.props.currentCriterionNumber === this.props.nCriterion ? 'success' : 'default'}>
          Criteria: {this.props.currentCriterionNumber} / {this.props.nCriterion}
        </Label>
      </div>
    );
  }
}
Toolbar.propTypes = {
  criterion: React.PropTypes.shape({
    sectionPath: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
  }).isRequired,
  currentCriterionNumber: React.PropTypes.number.isRequired,
  nCriterion: React.PropTypes.number.isRequired
}
Toolbar.defaultProps = {
  criterion: {
    sectionPath: ['']
  }
}

class CriteriaBody extends Component {

  getGradeValidationState() {
    if ((!this.props.criterion.pointsEarnedFloat && this.props.criterion.pointsEarnedFloat !== 0) || (this.props.criterion.pointsEarnedFloat < 0)) {
      /* This conditional really tests 2 different edge cases that both result in 'error'
        1. User supplies value that is not a float (need to check for zero false positive)
        2. User supplies value that is not negative
      */
      return 'error'
    } else if (this.props.criterion.pointsEarnedFloat > this.props.criterion.pointsPossibleFloat) {
      // check for a value that exceeds the rubric's points possible
      // warn the user that they are giving extra credit, but don't stop them from doing so'
      return 'warning'
    } else {
      // will only happen for numeric value in [0, pointsPossible]
      return 'success'
    }
  }

  getCommentValidationState() {
    if (this.props.criterion.comment && this.props.criterion.comment.length > 0) {
      return 'success';
    }
  }

  render() {  
    return (
      <form autoFocus id='criteria-body'>
          <p className='center-block'>{this.props.criterion.name} ({this.props.criterion.pointsPossible})</p>
          <p>{this.props.criterion.description}</p>
          <FormGroup
            controlId="criteriaGradeForm"
            validationState={this.getGradeValidationState()}
            bsSize="small"
          >
              <ControlLabel>Grade</ControlLabel>
              <FormControl
                type="text"
                value={this.props.criterion.pointsEarned}
                onChange={this.props.criteriaGradeChanged}
                autoFocus
                autoComplete="off"
              />
              <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="criteriaCommentForm"
            validationState={this.getCommentValidationState()}
            bsSize="large"
            className='comment-form-group'
          >
            <ControlLabel>Comment</ControlLabel>
            <FormControl 
              componentClass="textarea"
              value={this.props.criterion.comment}
              onChange={this.props.criteriaCommentChanged}
            />
          </FormGroup>

          <FormGroup
            controlId="criteriaDefaultCommentForm"
            bsSize="small"
          >
            <ControlLabel>Default comments</ControlLabel>
            <FormControl componentClass='select' onChange={this.props.criteriaDefaultCommentChanged}>
              {
                this.props.criterion.defaultComments.map((defaultComment, i) => 
                  <option key={i} value={i}>{defaultComment.text}</option>
                )
              }
            </FormControl>
          </FormGroup>
          <button onClick={this.props.criteriaSaveCommentAsDefault}>Save comment as a default comment</button>
      </form>
    );
  }
}
CriteriaBody.propTypes = {
  criterion: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    pointsPossible: React.PropTypes.string.isRequired,
    pointsEarned: React.PropTypes.string.isRequired,
    defaultComments: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string,
      weight: React.PropTypes.string
    })),
  }).isRequired,
  criteriaGradeChanged: React.PropTypes.func.isRequired,
  criteriaCommentChanged: React.PropTypes.func.isRequired,
  criteriaDefaultCommentChanged: React.PropTypes.func.isRequired,
  criteriaSaveCommentAsDefault: React.PropTypes.func.isRequired,
}
CriteriaBody.defaultProps = {
  criterion: {
    name: '',
    pointsEarned: '-1',
    pointsPossible: '-1',
    defaultComments: []
  },
  criteriaGradeChanged: () => {},
  criteriaCommentChanged: () => {},
  criteriaDefaultCommentChanged: () => {},
  criteriaSaveCommentAsDefault: () => {},
}

export class CriteriaPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;

    this.onCriteriaGradeChanged = this.onCriteriaGradeChanged.bind(this);
    this.onCriteriaCommentChanged = this.onCriteriaCommentChanged.bind(this);
    this.onCriteriaDefaultCommentChanged = this.onCriteriaDefaultCommentChanged.bind(this);

    this.onNavigateToReportPage = this.onNavigateToReportPage.bind(this);
    this.onNavigateToPrevCriteria = this.onNavigateToPrevCriteria.bind(this);
    this.onNavigateToNextCriteria = this.onNavigateToNextCriteria.bind(this);
    this.onIncrementCriteriaGrade = this.onIncrementCriteriaGrade.bind(this);
    this.onDecrementCriteriaGrade = this.onDecrementCriteriaGrade.bind(this);
    this.onCriteriaSaveCommentAsDefault = this.onCriteriaSaveCommentAsDefault.bind(this);
  }

  get currentCriterionIndex() {return parseInt(this.props.params.criteriaIndex, 10) - 1;}
  get currentCriterion() {return this.props.criteria[this.currentCriterionIndex]; }

  componentWillMount() {
    // invoked once, before initial 'render'
    if (parseInt(this.props.params.criteriaIndex, 10)) {
      // retrieve current criteria index from url route parameter
      var currentCriterionNumber = parseInt(this.props.params.criteriaIndex, 10);
      if (currentCriterionNumber > 0) {
        if (this.props.criteria && this.props.criteria.length === 0) {
          // console.log('redirect to home, rubric has not been loaded yet');
          this.context.router.push('/');
        }
      } else {
        // console.log('404 - url integer parameter must be from [1, inf]');
      }
    } else {
      // console.log('404 - url must include an integer parameter');
    }
  }

  onCriteriaGradeChanged(e) {
    this.props.dispatch(updateCriterionGrade(this.currentCriterionIndex, e.target.value));
  }

  onCriteriaCommentChanged(e) {
    this.props.dispatch(updateCriterionComment(this.currentCriterionIndex, e.target.value));
  }

  onCriteriaDefaultCommentChanged(e) {
    let defaultCommentIndex = parseInt(e.target.value, 10);
    let defaultComment = this.currentCriterion.defaultComments[defaultCommentIndex];

    let newGrade = String(this.currentCriterion.pointsPossible - defaultComment.deduction);
    this.props.dispatch(updateCriterionGrade(this.currentCriterionIndex, newGrade));
    if (defaultCommentIndex > 0) {
      this.props.dispatch(updateCriterionComment(this.currentCriterionIndex, defaultComment.text));
    } else {
      this.props.dispatch(updateCriterionComment(this.currentCriterionIndex, ''));
    }
  }

  onCriteriaSaveCommentAsDefault() {
    let defaultComment = {
      text: this.currentCriterion.comment,
      deduction: String(this.currentCriterion.pointsPossible - this.currentCriterion.pointsEarned),
    }
    this.props.dispatch(addCriterionDefaultComment(this.currentCriterionIndex, defaultComment));
  }

  onNavigateToReportPage(e) {
    this.context.router.push(`/report/${this.props.params.criteriaIndex}`);
  }

  onNavigateToPrevCriteria(e) {
    var previousCriterionNumber = parseInt(this.props.params.criteriaIndex, 10) - 1;
    if (previousCriterionNumber > 0) {
      this.context.router.push(`/criteria/${previousCriterionNumber}`);
    }
  }

  onNavigateToNextCriteria(e) {
    var nextCriterionNumber = parseInt(this.props.params.criteriaIndex, 10) + 1;
    if (nextCriterionNumber <= this.props.criteria.length) {
      this.context.router.push(`/criteria/${nextCriterionNumber}`);
    }
  }

  onIncrementCriteriaGrade() {
    // check for '0' because a parseFloat("0", 10) === false, so we have to avoid that edge case
    if (parseFloat(this.currentCriterion.pointsEarned, 10)  || this.currentCriterion.pointsEarned === '0') {
      var incrementedGrade = this.currentCriterion.pointsEarnedFloat + 1;
      if (incrementedGrade <= this.currentCriterion.pointsPossibleFloat) {
        incrementedGrade = String(incrementedGrade);
        this.props.dispatch(updateCriterionGrade(this.currentCriterionIndex, incrementedGrade));
      }
    }
  }

  onDecrementCriteriaGrade() {
    // don't need to check for parseFloat("0", 10) === false edge case because we don't want to decrement if already zero
    if (parseFloat(this.currentCriterion.pointsEarned, 10)) {
      var decrementedGrade = parseFloat(this.currentCriterion.pointsEarned, 10) - 1;
      decrementedGrade = String(decrementedGrade);
      this.props.dispatch(updateCriterionGrade(this.currentCriterionIndex, decrementedGrade));
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
        right: 'right',
        shift_up: 'shift+up'
      },
      handlers: {
        up: this.onIncrementCriteriaGrade,
        down: this.onDecrementCriteriaGrade,
        left: this.onNavigateToPrevCriteria,
        right: this.onNavigateToNextCriteria,
        shift_up: this.onNavigateToReportPage
      }
    }

    return (
      <div id='criteria-page' className='container'>
        <HotKeys keyMap={keyboardEvents.keyMap} handlers={keyboardEvents.handlers}>

          <Toolbar 
            criterion={criterion}
            currentCriterionNumber={currentCriterionNumber}
            nCriterion={this.props.criteria.length}
          />

          <CriteriaBody
            criterion={criterion}
            criteriaGradeChanged={this.onCriteriaGradeChanged}
            criteriaCommentChanged={this.onCriteriaCommentChanged}
            criteriaDefaultCommentChanged={this.onCriteriaDefaultCommentChanged}
            criteriaSaveCommentAsDefault={this.onCriteriaSaveCommentAsDefault}
          />     
        </HotKeys>
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
