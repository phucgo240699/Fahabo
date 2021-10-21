import {fork} from '@redux-saga/core/effects';
import signIn from './signIn';
import signUp from './signUp';
import profile from './profile';
import family from './family';
import albums from './albums';

export default function* rootSaga() {
  yield fork(signIn);
  yield fork(signUp);
  yield fork(profile);
  yield fork(family);
  yield fork(albums);
}
