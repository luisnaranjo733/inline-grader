import React, { Component } from 'react';
import './App.css';
import HomePage from './modules/HomePage'
import CriteriaPage from './modules/CriteriaPage'
import ReportPage from './modules/ReportPage'

class App extends Component {
  render() {
    return (
      <div>
        <ReportPage />
      </div>
    );
  }
}

export default App;
