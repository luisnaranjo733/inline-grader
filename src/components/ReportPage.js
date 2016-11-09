import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Col } from 'react-bootstrap';

const RootSectionComponent = ({sectionTitle, totalPointsEarned, totalPointsPossible, comments}) => (
  <div className="row">
    <Col sm={2}>
      <p>{sectionTitle} ({totalPointsEarned}/{totalPointsPossible})</p>
    </Col>

    <Col sm={10}>
      {comments.filter((comment) => {
        return comment !== ''
      })
      .map((comment, i) => 
          <p key={i}>* {comment}</p>
        )
      }
    </Col>
  </div>
);

class ReportPage extends Component {
  constructor(props, context) {
    super(props);
    this.context = context;
    this.onNavigateDown = this.onNavigateDown.bind(this);
  }

  onNavigateDown(e) {
    this.context.router.push(`/criteria/${this.props.params.criteriaIndex}`);
  }

  render() {
    var rootSections = {};
    /*
    var rootSections = {
      'sectionTitle': {
        pointsEarned: 0,
        poitnsPossible: 0,
        comments: ['', '']
      }
    };
    */

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
      },
      handlers: {
        down: this.onNavigateDown,
      }
    }

    var rootSectionsArray = [];
    Object.keys(rootSections).forEach(function(rootSectionName) {
      var rootSection = rootSections[rootSectionName];
      rootSectionsArray.push(rootSection);
    })


    return (
      <HotKeys keyMap={keyboardEvents.keyMap} handlers={keyboardEvents.handlers} ref={function(component) {
          if (component) {
            ReactDOM.findDOMNode(component).focus();
          }
        }}>
        <h1>Grade Report</h1>
        <ul>
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
