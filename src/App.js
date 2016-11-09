import React, { Component } from 'react';
import { connect } from 'react-redux';
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
          <li><Link to="/">{this.props.rubricName || String('Inline Grader')}</Link></li>
        </ul>
      </nav>

    )
  }
}
function mapStateToProps(state) {
  return {
    rubricName: state.rubricName
  }
}
connect(mapStateToProps)(FixedNavBar);

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <FixedNavBar />
        </header>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}



export default App;

