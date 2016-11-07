import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router'

class FixedNavBar extends Component {
  render() {

    const navBarStyle = {
      borderBottom: 'thin solid black',
      backgroundColor: 'white'
    }

    return (
      <nav style={navBarStyle}>
        <ul>
          <li><Link to="/">{'Inline Grader'}</Link></li>
          <li><Link to="/criteria/1">criteria 1</Link></li>
          <li><Link to="/report">Report</Link></li>
        </ul>
      </nav>

    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <FixedNavBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
