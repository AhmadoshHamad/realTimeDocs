// sagas/index.js
import { takeLatest, put,all } from 'redux-saga/effects';
import { setMessage, addMessage } from '../actions';
import io from 'socket.io-client';
const socket = io('http://172.23.194.171:5000');
// Worker Saga: Fired on SEND_MESSAGE action
function* sendMessageSaga(action) {
  try {
    // Emit the message to the socket
    socket.emit('send_message', { message: action.payload });

    // Optionally, you can add the message to the state immediately
    yield put(addMessage(action.payload));
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Watcher Saga: Watches for actions dispatched to the store and starts worker saga
function* watchSendMessage() {
  yield takeLatest('SEND_MESSAGE', sendMessageSaga);
}

// Root Saga
export default function* rootSaga() {
  yield all([
    watchSendMessage(),
    // add other sagas here
  ]);
}
