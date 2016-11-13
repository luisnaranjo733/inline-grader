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
          <li><Link to="/">{this.props.rubricName ? this.props.rubricName : String('Inline Grader')}</Link></li>
        </ul>
      </nav>

    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <FixedNavBar rubricName={this.props.rubricName}/>
        </header>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rubricName: state.rubricName
  }
}

export default connect(mapStateToProps)(App);

