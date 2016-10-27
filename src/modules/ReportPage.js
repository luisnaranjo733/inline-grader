import React, { Component } from 'react';
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
    var comments = [];
    for (var i = 0; i < this.props.comments.length; i++) {
      var comment = this.props.comments[i];
      if (comment) {
        comments.push(<p key={i}>* {comment}</p>);
      }
    }
    return (
      <div style={customDivStyle}>
        {comments}
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

class StartOver extends Component {
  
  render() {
    var buttonStyle = {};
    return (
      <button style={buttonStyle} onClick={this.props.handleStartOverButtonClicked}>Start over</button>
    );
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

  resetGradingRubric() {
    console.log("Reset grading rubric");
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

      <StartOver handleStartOverButtonClicked={this.resetGradingRubric}/>
        
      </div>
    );

  }
}

export default ReportPage;