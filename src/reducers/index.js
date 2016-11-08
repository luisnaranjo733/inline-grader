var initialState = {
  criteria: [],
  rubricName: ''
};

const rubricReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APPEND_CRITERION':
      var newCriteria = Object.assign([], state.criteria);
      newCriteria.push(action.criterion);
      var newState = Object.assign({}, state, {criteria: newCriteria});
      return newState;
    case 'UPDATE_RUBRIC_NAME':
      return Object.assign({}, state, {rubricName: action.rubricName});
    default:
      return state
  }
}

export default rubricReducer;