import React, { Component } from 'react';
import {Link} from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../index.css';

var divStyle = {
  borderStyle: 'solid',
  height: '175px',
};

var centerStyle = {
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '160px',
}

class RootSection extends Component {
  render() {
    return (
      <div style={divStyle}>
        <p style={centerStyle}>{this.props.name}</p>
      </div>
    )
  }
}

class Comment extends Component {
  render() {
    var customDivStyle = Object.assign({}, divStyle);
    customDivStyle['padding'] = '1em';
    customDivStyle['overflow'] = 'scroll';
    return (
      <div style={customDivStyle}>
        {this.props.comments.map(function(comment, i){
            if (comment) {
              return <p key={i}>* {comment}</p>;
            }
        })}
      </div>
    )
  }
}

class Grade extends Component {
  render() {
    return (
      <div style={divStyle}>
        <p style={centerStyle}>{this.props.numerator} / {this.props.denominator}</p>
      </div>
    )
  }
}


class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootSections: {}
    };
    this.structureCriteriaArray();
    console.log('structured root level sections');
    console.log(this.state.rootSections)
    console.log('done')
  }

  structureCriteriaArray() {
    for (var criteria of this.props.currentRubric.criteria) {
      var sectionName = criteria.path[0];
      if (!this.state.rootSections[sectionName]) {
        this.state.rootSections[sectionName] = {
          comments: [],
          pointsEarned: 0,
          pointsPossible: 0
        }
      }

      console.log(criteria.grade);
      this.state.rootSections[sectionName].comments.push(criteria.comment);
      this.state.rootSections[sectionName].pointsEarned += parseInt(criteria.grade, 10) || 0;
      this.state.rootSections[sectionName].pointsPossible += parseInt(criteria.weight, 10);

    }
  }

  render() {
    var containerStyle = {
      // marginLeft
    };

    var rowStyle = {
      marginBottom: '2em'
    };

    return (
      <div className="body">
        <h1>Grade Report</h1>
        <Link to="/">Home</Link>

        <div className='container' style={containerStyle}>
        {Object.keys(this.state.rootSections).map(function(rootSectionName, i){
          var rootSection = this.state.rootSections[rootSectionName];
          return (
            <div key={i} className='row' style={rowStyle}>
              <div className='col-sm-2'>
                <RootSection name={rootSectionName}/>
              </div>

              <div className='col-sm-8'>
                <Comment comments={rootSection.comments}/>
              </div>

              <div className='col-sm-2'>
                <Grade numerator={rootSection.pointsEarned} denominator={rootSection.pointsPossible}/>
              </div>
            </div>
          );
        }, this)}

        </div>
      </div>
    );

  }
}

export default ReportPage;