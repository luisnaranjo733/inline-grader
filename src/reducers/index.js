const rubricReducer = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_XML':
      return '';
    case 'RECEIVE_XML':
      return '';
    default:
      return state
  }
}

export default rubricReducer;