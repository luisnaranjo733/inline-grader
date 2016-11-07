import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router'


class App extends Component {
  render() {
    return (
      <div>
        <p>navbar will go here</p>
        <Link to="/">Home</Link>
        <Link to="/criteria/1">criteria 1</Link>
        <Link to="/report">Report</Link>
        {this.props.children}
      </div>
    );
  }
}

export default App;
