import React, { Component } from 'react';
import './App.css';
import HomePage from './modules/HomePage'
import CriteriaPage from './modules/CriteriaPage'

class App extends Component {
  render() {
    return (
      <div>
        <HomePage />
        <br />
        <CriteriaPage />
      </div>
    );
  }
}

export default App;
