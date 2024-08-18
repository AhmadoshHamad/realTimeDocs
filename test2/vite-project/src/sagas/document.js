// sagas/document.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { CREATE_DOCUMENT, addDocument } from './actions';

function* createDocumentSaga(action) {
  const id = localStorage.getItem('id');
  try {
    const response = yield call(axios.post, `http://172.23.194.171:5000/users/${id}/documents`, action.payload);
    if (response.status === 201) {
      yield put(addDocument(response.data));
    }
  } catch (error) {
    console.error("Error creating document:", error);
  }
}

export default function* watchCreateDocument() {
  yield takeLatest(CREATE_DOCUMENT, createDocumentSaga);
}
