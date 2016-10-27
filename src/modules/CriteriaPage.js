import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Breadcrumb, Button} from 'react-bootstrap'
import {Link} from 'react-router'
import ReportPage from './ReportPage'

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
      numerator += 1;  
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
  constructor(props) {
    super(props);
    this.onCurrentGradeChange = this.onCurrentGradeChange.bind(this);
    this.onCurrentCommentChange = this.onCurrentCommentChange.bind(this);
  }

  onCurrentGradeChange(event) {
    this.props.setCurrentCriteriaGrade(event.target.value);
  }

  onCurrentCommentChange(event) {
    this.props.setCurrentCriteriaComment(event.target.value);
  }

  render() {
    var criteriaContainerStyle = {
      padding: '2em',
      border: 'solid',
      // marginLeft: '2em',
      // marginRight: '2em',

      // height: '600px'
    };

    var currentCriteria = this.props.criteria[this.props.currentCriteriaIndex]
    var body = '<Criteria body>';
    var weight = '?'
    if (currentCriteria && currentCriteria.name && currentCriteria.weight) {
      body = currentCriteria.name;
      weight = currentCriteria.weight;
    }

    return (
      <div className='criteria-body' style={criteriaContainerStyle}>
        <p className='center-block'>{body} ({weight})</p>

        <div>
          <label htmlFor="grade">Grade</label><br />
          <input type="text" id="grade" name="grade" value={this.props.getCurrentCriteriaGrade} onChange={this.onCurrentGradeChange}/>
        </div>

        <div>
          <label htmlFor="comment">Comment</label><br/>
          <textarea id="comment" name="comment" value={this.props.getCurrentCriteriaComment} onChange={this.onCurrentCommentChange}></textarea>
        </div>
      </div>
    );
  }
}

class LaunchGradeReportButton extends Component {
  render() {
    var wellStyle = {
      maxWidth: 400, margin: '0 auto 10px',
      display: 'none'
    };

    if (this.props.currentCriteriaIndex + 1 === this.props.nTotalCriteria) {
      wellStyle['display'] = 'block';
    }

    return (
      <Button style={wellStyle} bsStyle="primary" bsSize="large" onClick={this.props.handleLaunchReportButtonClicked} block>All done! Finalize grade</Button>
    );
  }
}

class CriteriaPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      masterRubric: this.props.masterRubric, // this probably doesn't need to be a state variable because we are only using it to make copies
      currentRubric: {
        name: this.props.masterRubric.name,
        criteria: this.props.masterRubric.criteria.slice() // deep copy array for first student
      },
      currentCriteriaIndex: 0,
      currentCriteriaGrade: '',
      currentCriteriaComment: '',
      showGradingReport: false
    }
    this.hotkeyHandler = this.handleHotkey.bind(this);
    this.handleLaunchReportButtonClicked = this.handleLaunchReportButtonClicked.bind(this);
    this.setCurrentCriteriaGrade = this.setCurrentCriteriaGrade.bind(this);
    this.setCurrentCriteriaComment = this.setCurrentCriteriaComment.bind(this);
  }

  transitionCriteriaState() {
    var currentCriteria = this.state.currentRubric.criteria[this.state.currentCriteriaIndex];
    this.setState({currentCriteriaGrade: currentCriteria.grade});
    this.setState({currentCriteriaComment: currentCriteria.comment});
  }

  setCurrentCriteriaGrade(grade) {
    this.setState({currentCriteriaGrade: grade});
  }

  setCurrentCriteriaComment(comment) {
    this.setState({currentCriteriaComment: comment});
  }

  // this method needs some major cleanup
  handleHotkey(event) {
    var newIndex;
    if (event.key === 'ArrowUp') {
      this.setState({showGradingReport: true});
    } else if(event.key === 'ArrowDown') {
      this.setState({showGradingReport: false});
    } else if (event.key === 'ArrowLeft') {
      newIndex = this.state.currentCriteriaIndex - 1;
      if (newIndex >= 0) {
        // fetch grade and comment values from <CriteriaBody /> state
        // fetch current criteria with this.state.currentRubric.criteria this.state.currentCriteriaIndex
        // set grade and comment values on current criteria state
        var currentCriteria = this.state.currentRubric.criteria[this.state.currentCriteriaIndex];
        currentCriteria.grade = this.state.currentCriteriaGrade;
        currentCriteria.comment = this.state.currentCriteriaComment;

        this.setState({ currentCriteriaIndex: newIndex });
        this.transitionCriteriaState();
      }
    } else if (event.key === 'ArrowRight') {
      newIndex = this.state.currentCriteriaIndex + 1;
      if (newIndex < this.state.currentRubric.criteria.length) {
        // fetch grade and comment values from <CriteriaBody /> state
        // fetch current criteria with this.state.currentRubric.criteria this.state.currentCriteriaIndex
        // set grade and comment values on current criteria state
        var currentCriteria = this.state.currentRubric.criteria[this.state.currentCriteriaIndex];
        currentCriteria.grade = this.state.currentCriteriaGrade;
        currentCriteria.comment = this.state.currentCriteriaComment;

        this.setState({ currentCriteriaIndex: newIndex});
        this.transitionCriteriaState();
      }
    } 
  }

  handleLaunchReportButtonClicked() {
    console.log("Button clicked!!!!");
    this.setState({showGradingReport: !this.state.showGradingReport});
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
    if (this.state.showGradingReport) {
      console.log("CriteriaPage")
      console.log(this.state.currentRubric)
      return <ReportPage currentRubric={this.state.currentRubric}/>
    } else {
      return (
        <div className="container" style={containerStyle}>
          <ToolBar currentCriteriaIndex={this.state.currentCriteriaIndex} criteria={this.state.currentRubric.criteria}/>
          <CriteriaBody
            currentCriteriaIndex={this.state.currentCriteriaIndex}
            setCurrentCriteriaGrade={this.setCurrentCriteriaGrade}
            setCurrentCriteriaComment={this.setCurrentCriteriaComment}
            getCurrentCriteriaGrade={this.state.currentCriteriaGrade}
            getCurrentCriteriaComment={this.state.currentCriteriaComment}
            criteria={this.state.currentRubric.criteria}
          />
          <LaunchGradeReportButton
            currentCriteriaIndex={this.state.currentCriteriaIndex}
            handleLaunchReportButtonClicked={this.handleLaunchReportButtonClicked}
            nTotalCriteria={this.state.currentRubric.criteria.length}
          />
          <Link to="/criteria/report">Link</Link>
        </div>
      )
    }
  }
}

export default CriteriaPage;

