import {fork} from '@redux-saga/core/effects';
import signIn from './signIn';
import signUp from './signUp';
import profile from './profile';
import family from './family';
import albums from './albums';
import screens from './screens';

export default function* rootSaga() {
  yield fork(signIn);
  yield fork(signUp);
  yield fork(screens);
  yield fork(profile);
  yield fork(family);
  yield fork(albums);
}
