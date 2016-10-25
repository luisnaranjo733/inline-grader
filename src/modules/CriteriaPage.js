import React, { Component } from 'react';
//import Rubric from './Rubric';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Breadcrumb} from 'react-bootstrap'
//import {Link} from 'react-router';

class BreadCrumbs extends Component {
  render() {
    this.props.criteria[this.props.currentCriteriaIndex].path.map(function(section, i) {
      return <Breadcrumb.Item key={i}>{section}</Breadcrumb.Item>
    });
    return (
      // <Breadcrumb>
      //   <Breadcrumb.Item>
      //     Home
      //   </Breadcrumb.Item>
      //   <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
      //     Library
      //   </Breadcrumb.Item>
      //   <Breadcrumb.Item active>
      //     Data
      //   </Breadcrumb.Item>
      // </Breadcrumb>
      <Breadcrumb>
      {this.props.criteria[this.props.currentCriteriaIndex].path.map(function(section, i) {
        return <Breadcrumb.Item key={i}>{section}</Breadcrumb.Item>
      })}
      </Breadcrumb>
    );
  }
}

class ProgressBox extends Component {
  render() {
    return (
      <span className="pull-right progress-box">
        Criteria: {this.props.currentCriteriaIndex} / {this.props.nTotalCriteria}
      </span>
    );
  }
}


class ToolBar extends Component {
  render() {
    return (
      <div className="criteria-toolBar">
        <BreadCrumbs currentCriteriaIndex={this.props.currentCriteriaIndex} criteria={this.props.criteria}/>
        <ProgressBox currentCriteriaIndex={this.props.currentCriteriaIndex} nTotalCriteria={this.props.criteria.length}/>
      </div>
    );
  }
}

class Body extends Component {
  render() {
    return (
      <div>
        <p>{this.props.criteria[this.props.currentCriteriaIndex].name}</p>
      </div>
    );
  }
}

class CriteriaPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      currentRubric: {
        name: this.props.rubric.name,
        criteria: this.props.rubric.criteria
      },
      currentCriteriaIndex: 18
    }

  }

  render() {
    return (
      <div className="criteria-page">
        <ToolBar currentCriteriaIndex={this.state.currentCriteriaIndex} criteria={this.state.currentRubric.criteria}/>
        <Body currentCriteriaIndex={this.state.currentCriteriaIndex} criteria={this.state.currentRubric.criteria}/>
      </div>
      
    );
  }
}

export default CriteriaPage;

