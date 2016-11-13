import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import CopyToClipboard from 'react-copy-to-clipboard';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Col, Button} from 'react-bootstrap';
import {resetRubric} from '../actions/'

class RootSectionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments.filter((comment) => {
        return comment !== '';
      }).map((comment) => {
        return `* ${comment}`
      }).join('\n')
    };

  }

  render() {
    return (
      <div className="row rootSectionRow">
        <Col sm={2} className='rootSectionTitle'>
          <p>{this.props.sectionTitle}</p>
          <br />
          <p>({this.props.totalPointsEarned}/{this.props.totalPointsPossible})</p>
        </Col>

        <CopyToClipboard text={this.state.comments}>
          <Col sm={10} className='rootSectionComments'>
            <textarea value={this.state.comments} readOnly/>
          </Col>
        </CopyToClipboard>
      </div>
    );
  }
}

class ReportPage extends Component {
  constructor(props, context) {
    super(props);
    this.context = context;
    this.onNavigateDown = this.onNavigateDown.bind(this);
    this.onNavigateLeft = this.onNavigateLeft.bind(this);
    this.onResetRubric = this.onResetRubric.bind(this);
  }

  onNavigateDown(e) {
    this.context.router.push(`/criteria/${this.props.params.criteriaIndex}`);
  }

  onNavigateLeft(e) {
    this.context.router.push(`/criteria/${this.props.params.criteriaIndex}`);
  }

  onResetRubric() {
    this.props.dispatch(resetRubric());
    this.context.router.push('/criteria/1');
  }

  render() {
    var rootSections = {};

    this.props.criteria.forEach(function(criterion) {
      if (!rootSections[criterion.rootSection]) {
        rootSections[criterion.rootSection] = {
          totalPointsEarned: 0,
          totalPointsPossible: 0,
          comments: []
        };
      }
      rootSections[criterion.rootSection]['sectionTitle'] = criterion.rootSection;
      rootSections[criterion.rootSection]['totalPointsEarned'] += parseInt(criterion.pointsEarned, 10);
      rootSections[criterion.rootSection]['totalPointsPossible'] += parseInt(criterion.pointsPossible, 10);
      rootSections[criterion.rootSection]['comments'].push(criterion.comment);
    });

    const keyboardEvents = {
      keyMap: {
        down: 'down',
        left: 'left',
      },
      handlers: {
        down: this.onNavigateDown,
        left: this.onNavigateLeft,
      }
    }

    var rootSectionsArray = [];
    Object.keys(rootSections).forEach(function(rootSectionName) {
      var rootSection = rootSections[rootSectionName];
      rootSectionsArray.push(rootSection);
    })


    return (
      <div className='container'>
        <HotKeys keyMap={keyboardEvents.keyMap} handlers={keyboardEvents.handlers} ref={function(component) {
            if (component) {
              ReactDOM.findDOMNode(component).focus();
            }
          }}>
          <h1>Grade Report</h1>
          <ul id='rootSectionRows'>
            {rootSectionsArray.map((rootSectionObj, i) => 
                <RootSectionComponent
                  key={i}
                  sectionTitle={rootSectionObj.sectionTitle}
                  totalPointsEarned={rootSectionObj.totalPointsEarned}
                  totalPointsPossible={rootSectionObj.totalPointsPossible}
                  comments={rootSectionObj.comments}
                />
              )
            }
          </ul>
        </HotKeys>

      <Button bsStyle="primary" onClick={this.onResetRubric}>Reset rubric</Button>
      </div>
    );
  }
}
ReportPage.contextTypes = {router: React.PropTypes.object};

function mapStateToProps(state) {
  return {
    criteria: state.criteria,
    rubricName: state.rubricName
  }
}

export default connect(mapStateToProps)(ReportPage);
