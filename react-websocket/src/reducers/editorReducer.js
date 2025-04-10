// reducers/editorReducer.js
const initialState = {
  message: '',
  messages: [],
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default editorReducer;
