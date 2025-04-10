// actions/index.js
export const setMessage = (message) => ({
    type: 'SET_MESSAGE',
    payload: message,
  });
  
  export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
  });
  
  // actions.js
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const ADD_DOCUMENT = 'ADD_DOCUMENT';

export const createDocument = (documentData) => ({
  type: CREATE_DOCUMENT,
  payload: documentData,
});
