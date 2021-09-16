import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from '@store/actionTypes/signIn';
import {call} from 'typed-redux-saga';
import {signIn} from '@services/signIn';
import {takeLatest} from 'redux-saga/effects';
import {SignInRequestType} from '@constants/types/signIn';

function* apiSignIn(body: SignInRequestType) {
  return yield* call(signIn, body);
}

function* onSignInRequest(action: any) {}

function* onSignInSuccess(action: any) {}

function* onSignInFail(action: any) {}

export default function* () {
  yield takeLatest(SIGN_IN_REQUEST, onSignInRequest);
  yield takeLatest(SIGN_IN_SUCCESS, onSignInSuccess);
  yield takeLatest(SIGN_IN_FAIL, onSignInFail);
}
