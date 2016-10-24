import React, { Component } from 'react';
import { Link } from 'react-router'
import Rubric from './Rubric';

class Nav extends Component {
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
        <h1>Inline Grader</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/criteria/1">Criteria</Link></li>
        </ul>

        <p>Rubric: {this.state.rubric.name || this.state.rubric} </p>

        {/* add this */}
        {this.props.children && React.cloneElement(this.props.children, {
          onAddRubric: this.addRubric
        })}

      </div>
    )
  }
}

export default Nav;