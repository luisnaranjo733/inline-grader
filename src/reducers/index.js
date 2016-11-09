var initialState = {
  criteria: [],
  rubricName: ''
};

const rubricReducer = (state = initialState, action) => {
  var newCriteria = Object.assign([], state.criteria);
  switch (action.type) {
    case 'APPEND_CRITERION':
      newCriteria.push(action.criterion);
      var newState = Object.assign({}, state, {criteria: newCriteria});
      return newState;
    case 'UPDATE_RUBRIC_NAME':
      return Object.assign({}, state, {rubricName: action.rubricName});
    case 'UPDATE_CRITERION_GRADE':
      newCriteria[action.criterionIndex].pointsEarned = action.value;
      return Object.assign({}, state, {criteria: newCriteria});
    case 'UPDATE_CRITERION_COMMENT':
      newCriteria[action.criterionIndex].comment = action.value;
      return Object.assign({}, state, {criteria: newCriteria});
    default:
      return state
  }
}

export default rubricReducer;