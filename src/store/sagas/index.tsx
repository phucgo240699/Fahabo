import {fork} from '@redux-saga/core/effects';
import signIn from './signIn';
import signUp from './signUp';
import profile from './profile';
import family from './family';

export default function* rootSaga() {
  yield fork(signIn);
  yield fork(signUp);
  yield fork(profile);
  yield fork(family);
}
