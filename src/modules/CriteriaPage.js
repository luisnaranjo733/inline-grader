import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Breadcrumb, Button} from 'react-bootstrap'

var hotkey = require('react-hotkey');
hotkey.activate();

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
    var numerator = this.props.currentCriteriaIndex;
    var denominator = this.props.nTotalCriteria;

    if (numerator < denominator) {
      numerator = numerator + 1;  
    }

    return (
      <span className="pull-right progress-box">
        Criteria: {numerator} / {denominator}
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
  constructor(props, context) {
    super(props);
    this.state = {
      grade: 0,
      comment: ''
    }
  }

  render() {
    var criteriaContainerStyle = {
      padding: '2em',
      border: 'solid',
      // marginLeft: '2em',
      // marginRight: '2em',

      // height: '600px'
    };
    var criteriaTitleStyle = {
      margin: 'auto',
      display: 'inline'
    }

    var criteria = this.props.criteria[this.props.currentCriteriaIndex]
    var body = '<Criteria body>';
    var weight = '?'
    if (criteria && criteria.name && criteria.weight) {
      body = criteria.name;
      weight = criteria.weight;
    }

    return (
      <div className='' style={criteriaContainerStyle}>
        <p className='center-block'>{body} ({weight})</p>

        <div>
          <label for="grade">Grade</label><br />
          <input type="text" id="grade" name="grade" />
        </div>

        <div>
          <label for="comment">Comment</label><br/>
          <textarea id="comment" name="comment"></textarea>
        </div>
      </div>
    );
  }
}

class LaunchGradeReport extends Component {

  onClick(event) {
    console.log('the button was clicked');
  }

  render() {
    var wellStyle = {
      maxWidth: 400, margin: '0 auto 10px',
      display: 'none'
    };

    if (this.props.currentCriteriaIndex + 1 === this.props.nTotalCriteria) {
      wellStyle['display'] = 'block';
    }

    return (
      <div className="" style={wellStyle}>
        <Button bsStyle="primary" bsSize="large" onClick={this.onClick} block>All done! Finalize grade</Button>
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
      currentCriteriaIndex: 0
    }
    this.hotkeyHandler = this.handleHotkey.bind(this);
  }

  handleHotkey(event) {
    var newIndex;
    if (event.key === 'ArrowLeft') {
      newIndex = this.state.currentCriteriaIndex - 1;
      if (newIndex >= 0) {
        this.setState({ currentCriteriaIndex: newIndex });
      }
    } else if (event.key === 'ArrowRight') {
      newIndex = this.state.currentCriteriaIndex + 1;
      if (newIndex < this.state.currentRubric.criteria.length) {
        this.setState({ currentCriteriaIndex: newIndex});
      }
    }
  }

  componentDidMount() {
    hotkey.addHandler(this.hotkeyHandler);
  }

  componentWillUnmount() {
    hotkey.removeHandler(this.hotkeyHandler);
  }


  render() {
    var containerStyle = {
      paddingTop: '100px'
    };
    return (
      <div className="container" style={containerStyle}>
        <ToolBar currentCriteriaIndex={this.state.currentCriteriaIndex} criteria={this.state.currentRubric.criteria}/>
        <CriteriaBody currentCriteriaIndex={this.state.currentCriteriaIndex} criteria={this.state.currentRubric.criteria}/>
        <LaunchGradeReport currentCriteriaIndex={this.state.currentCriteriaIndex} nTotalCriteria={this.state.currentRubric.criteria.length}/>
      </div>
      
    );
  }
}

export default CriteriaPage;

