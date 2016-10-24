import React, { Component } from 'react';
import { Link } from 'react-router'
import Rubric from './Rubric';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class FixedNavBar extends Component {
  render() {

    const navBarStyle = {
      borderStyle: 'solid',
      borderBottom: 'thick solid #f44336!important'
    }

    return (
      // <span style={navBarStyle}>
      //   <h1>Inline Grader</h1>
      //   <ul>
      //     <li><Link to="/">Home</Link></li>
      //     <li><Link to="/criteria/1">Criteria</Link></li>
      //   </ul>
      //   <p>Rubric: {this.props.rubric.name || this.props.rubric} </p>
      // </span>
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Inline Grader</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1}>Criteria</NavItem>
      </Nav>
    </Navbar>
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