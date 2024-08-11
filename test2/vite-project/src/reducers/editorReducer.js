// reducers/editorReducer.js
const initialState = {
    message: '',
  };
  
  const editorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MESSAGE':
        return {
          ...state,
          message: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default editorReducer;