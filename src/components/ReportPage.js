import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {HotKeys} from 'react-hotkeys';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Col } from 'react-bootstrap';

const RootSection = ({sectionTitle, pointsEarned, pointsPossible, comments}) => (
  <div className="row">
    <Col sm={2}>
      <p>{sectionTitle} ({pointsEarned}/{pointsPossible})</p>
    </Col>

    <Col sm={10}>
      {comments.map((comment, i) => 
          <p key={i}>* {comment}</p>
        )
      }
    </Col>
  </div>
);
RootSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired, // parent state
  pointsEarned: PropTypes.number.isRequired, // parent state
  pointsPossible: PropTypes.number.isRequired, // parent state
  comments: PropTypes.arrayOf(React.PropTypes.string).isRequired // parent state
};

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
    this.props.criteria.forEach(function(criterion) {
      if (!rootSections[criterion.rootSection]) {
        rootSections[criterion.rootSection] = {
          totalPointsEarned: 0,
          totalPointsPossible: 0,
          comments: []
        };
      }
      rootSections[criterion.rootSection]['totalPointsEarned'] += criterion.pointsEarned;
      rootSections[criterion.rootSection]['totalPointsPossible'] += criterion.pointsPossible;
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


    return (
      <HotKeys keyMap={keyboardEvents.keyMap} handlers={keyboardEvents.handlers} ref={function(component) {
          if (component) {
            ReactDOM.findDOMNode(component).focus();
          }
        }}>
        <h1>Grade Report</h1>
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
