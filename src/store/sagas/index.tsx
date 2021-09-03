import {fork} from '@redux-saga/core/effects';
import signIn from './signIn';
import signUp from './signUp';

export default function* rootSaga() {
  yield fork(signIn);
  yield fork(signUp);
}
