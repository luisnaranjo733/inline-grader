import React from 'react'
import { Link } from 'react-router'
import HomePage from './modules/HomePage'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Inline Grader</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/criteria/1">Criteria</Link></li>
        </ul>

        {/* add this */}
        {this.props.children || <HomePage/>}

      </div>
    )
  }
})