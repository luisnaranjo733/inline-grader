import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Breadcrumb} from 'react-bootstrap'
import {updateCriterionGrade, updateCriterionComment} from '../actions/'

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

        <span className="pull-right" id='progress-box'>
          Criteria: {this.props.currentCriterionNumber} / {this.props.nCriterion}
        </span>
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
  render() {
    return (
      <div id='criteria-body'>
          <p className='center-block'>{this.props.criterion.name} ({this.props.criterion.pointsPossible})</p>
          <p>{this.props.criterion.description}</p>
          <div>
              <label htmlFor="grade">Grade</label><br />
              <input autoFocus type="text" id="grade" name="grade" value={this.props.criterion.pointsEarned} onChange={this.props.criteriaGradeChanged} />
          </div>

          <div>
              <label htmlFor="comment">Comment</label><br/>
              <textarea id="comment" name="comment" value={this.props.criterion.comment} onChange={this.props.criteriaCommentChanged}></textarea>
          </div>
      </div>
    );
  }
}
CriteriaBody.propTypes = {
  criterion: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    pointsPossible: React.PropTypes.string.isRequired,
    pointsEarned: React.PropTypes.string.isRequired
  }).isRequired,
  criteriaGradeChanged: React.PropTypes.func.isRequired,
  criteriaCommentChanged: React.PropTypes.func.isRequired
}
CriteriaBody.defaultProps = {
  criterion: {
    name: '',
    pointsEarned: '-1',
    pointsPossible: '-1'
  },
  criteriaGradeChanged: () => {},
  criteriaCommentChanged: () => {}
}

class CriteriaPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.state = {
      pointsEarned: '0',
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
    } else if (nextCriterionNumber > this.props.criteria.length) {
      this.context.router.push(`/report/${nextCriterionNumber - 1}`);
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
      <div id='criteria-page' className='container'>
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
