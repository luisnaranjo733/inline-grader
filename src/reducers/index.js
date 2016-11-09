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
    case 'UPDATE_CRITERION_GRADE':
      var newCriteria = Object.assign([], state.criteria);
      newCriteria[action.criterionIndex].pointsEarned = parseInt(action.value, 10);
      return Object.assign({}, state, {criteria: newCriteria});
    case 'UPDATE_CRITERION_COMMENT':
      var newCriteria = Object.assign([], state.criteria);
      newCriteria[action.criterionIndex].comment = action.value;
      return Object.assign({}, state, {criteria: newCriteria});
    default:
      return state
  }
}

export default rubricReducer;