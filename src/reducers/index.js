var initialState = {
  criteria: [],
  rubricName: ''
};

const rubricReducer = (state = initialState, action) => {
  var newCriteria = Object.assign([], state.criteria);
  switch (action.type) {
    case 'REPLACE_RUBRIC':
      return {
        criteria: action.criteria,
        rubricName: action.rubricName
      };
    case 'RESET_RUBRIC':
      newCriteria.forEach(function(criterion) {
        criterion.comment = '';
        criterion.defaultComments = [];
        criterion.pointsEarned = criterion.pointsPossible
      });
      return Object.assign({}, state, {criteria: newCriteria});
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