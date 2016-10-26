import React, { Component } from 'react';
import { Link } from 'react-router';
import Rubric from './Rubric';

class FixedNavBar extends Component {
  render() {

    const navBarStyle = {
      borderBottom: 'thin solid black',
      backgroundColor: 'white'
    }

    return (
      <nav style={navBarStyle}>
        <ul>
          <li><Link to="/">{this.props.rubricName || String('Inline Grader')}</Link></li>
        </ul>
      </nav>

    )
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rubric: new Rubric(),
    }
    this.addRubric = this.addRubric.bind(this);
  }

  addRubric(xmlBody) {
    var rubric = new Rubric(xmlBody);
    this.setState({ rubric: rubric });
  }

  render() {

    return (
      <div>
        <FixedNavBar rubricName={this.state.rubric.name}/>

        {this.props.children && React.cloneElement(this.props.children, {
          addRubric: this.addRubric,
          masterRubric: this.state.rubric
        })}

      </div>
    )
  }
}

export default Navigation;