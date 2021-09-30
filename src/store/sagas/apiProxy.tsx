import {
  logOutAction,
  refreshAccessTokenSuccessAction,
} from '../actionTypes/signIn';
import {showHUDAction} from '../actionTypes/session';
import {call, put} from 'typed-redux-saga';
import {refreshAccessToken} from '@services/signIn';
import {useSelector} from 'react-redux';
import {refreshTokenSelector} from '@store/selectors/authentication';

export function* apiProxy(fn: any, ...args: any[]): any {
  try {
    return yield call(fn, ...args);
  } catch (error: any) {
    console.log('apiProxy got error', error);
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      console.log('accessToken expired');
      try {
        const refreshToken = useSelector(refreshTokenSelector);
        const response = yield* call(refreshAccessToken, {refreshToken});
        if (response.status === 200) {
          put(
            refreshAccessTokenSuccessAction({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            }),
          );
        } else {
          put(logOutAction());
        }
      } catch (error) {}
    } else {
      throw error;
    }
  }
}
