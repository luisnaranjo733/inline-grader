import React, { Component, PropTypes } from 'react';
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

export default class ReportPage extends Component {
  render() {
    var rootSections = [ // sample state data
      {
        sectionTitle: 'Markup & Accessibility',
        pointsEarned: 38,
        pointsPossible: 40,
        comments: ['this', 'that', 'you forgot blah', 'blah']
      },
      {
        sectionTitle: 'Coding style & Documentation',
        pointsEarned: 24,
        pointsPossible: 27,
        comments: ['that', 'this', 'yblah', 'blah']
      }
    ];
    return (
      <div className='container'>
        <h1>Grade Report</h1>
        {rootSections.map((sectionProps, i) => {
          return <RootSection key={i} {...sectionProps} />
        })}
        
      </div>
    );
  }
}