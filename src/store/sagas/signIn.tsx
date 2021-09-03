import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from '@store/actionTypes/signIn';
import {takeLatest} from 'redux-saga/effects';

function* onSignInRequest(action: any) {}

function* onSignInSuccess(action: any) {}

function* onSignInFail(action: any) {}

export default function* () {
  yield takeLatest(SIGN_IN_REQUEST, onSignInRequest);
  yield takeLatest(SIGN_IN_SUCCESS, onSignInSuccess);
  yield takeLatest(SIGN_IN_FAIL, onSignInFail);
}
