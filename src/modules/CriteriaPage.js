import React, { Component } from 'react';
//import Rubric from './Rubric';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Breadcrumb} from 'react-bootstrap'
//import {Link} from 'react-router';

class BreadCrumbs extends Component {
  render() {
    var crumbs = [];
    var criteria = this.props.criteria[this.props.currentCriteriaIndex];
    if (criteria) {
      criteria.path.forEach(function(section, i) {
        crumbs.push(<Breadcrumb.Item key={i}>{section}</Breadcrumb.Item>);
      });
    } else {

    }

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
      {crumbs}
      </Breadcrumb>
    );
  }
}

class ProgressBox extends Component {
  render() {
    return (
      <span className="pull-right progress-box">
        Criteria: {this.props.currentCriteriaIndex} / {this.props.nTotalCriteria || String('?')}
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

class CriteriaBody extends Component {
  render() {
    var criteriaBodyStyle = {
      padding: '5em',
      border: 'solid'
    };

    var criteria = this.props.criteria[this.props.currentCriteriaIndex]
    var body = '<Criteria body>';
    if (criteria && criteria.name) {
      body = criteria.name;
    }

    return (
      <div style={criteriaBodyStyle}>
        <p>{body}</p>
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
        <CriteriaBody currentCriteriaIndex={this.state.currentCriteriaIndex} criteria={this.state.currentRubric.criteria}/>
      </div>
      
    );
  }
}

export default CriteriaPage;

