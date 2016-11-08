var initialState = {
  rubric: null
};

const rubricReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RUBRIC':
      return Object.assign({}, initialState, {rubric: action.rubric});
    default:
      return state
  }
}

export default rubricReducer;