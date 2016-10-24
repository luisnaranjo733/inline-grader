import React, { Component } from 'react';
import { Link } from 'react-router';
import Rubric from './Rubric';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class FixedNavBar extends Component {
  render() {

    const navBarStyle = {
      borderStyle: 'solid',
      borderBottom: 'thick solid #f44336!important'
    }

    return (
      <nav style={navBarStyle}>
        <ul>
          <li>Inline Grader</li>
          <li><Link to="/criteria/1">Criteria</Link></li>
        </ul>
      </nav>

    )
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rubric: 'aye',
    }
    this.addRubric = this.addRubric.bind(this);
  }

  addRubric(xmlBody) {
    var rubric = new Rubric(xmlBody);
    console.log(rubric.criteria);
    this.setState({ rubric: rubric });
  }

  render() {

    return (
      <div>
        <FixedNavBar rubric={this.state.rubric}/>
        {this.props.children && React.cloneElement(this.props.children, {
          onAddRubric: this.addRubric
        })}

      </div>
    )
  }
}

export default Navigation;