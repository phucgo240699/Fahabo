import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from '@store/actionTypes/signUp';
import {takeLatest} from 'redux-saga/effects';

function* onSignUpRequest(action: any) {}

function* onSignUpSuccess(action: any) {}

function* onSignUpFail(action: any) {}

export default function* () {
  yield takeLatest(SIGN_UP_REQUEST, onSignUpRequest);
  yield takeLatest(SIGN_UP_SUCCESS, onSignUpSuccess);
  yield takeLatest(SIGN_UP_FAIL, onSignUpFail);
}
