import React, { Component } from 'react';

class CriteriaGrader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rubric: {}
    };
  }

  render() {
    return (
      <h1>CriteriaGrader</h1>
    );
  }
}

export default CriteriaGrader;