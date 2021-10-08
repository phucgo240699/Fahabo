import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PROFILE_AVATAR_REQUEST,
  UPDATE_PROFILE_REQUEST,
} from '@store/actionTypes/profile';
import {AnyAction} from 'redux';
import {all, call, put, takeLatest} from 'typed-redux-saga';

function* onUpdateProfileSaga(action: AnyAction) {}

function* onUpdatePasswordSaga(action: AnyAction) {}

function* onUpdateProfileAvatarSaga(action: AnyAction) {}

export default function* () {
  yield* all([
    takeLatest(UPDATE_PROFILE_REQUEST, onUpdateProfileSaga),
    takeLatest(UPDATE_PASSWORD_REQUEST, onUpdatePasswordSaga),
    takeLatest(UPDATE_PROFILE_AVATAR_REQUEST, onUpdateProfileAvatarSaga),
  ]);
}
