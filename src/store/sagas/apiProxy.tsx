import {
  logOutAction,
  refreshAccessTokenSuccessAction,
} from '../actionTypes/signIn';
import {call, put} from 'typed-redux-saga';
import {refreshAccessToken} from '@services/signIn';
import {useSelector} from 'react-redux';
import {refreshTokenSelector} from '@store/selectors/authentication';
import {isRefreshingTokenSelector} from '@store/selectors/session';

export function* apiProxy(fn: any, ...args: any[]): any {
  try {
    const isRefreshingToken = useSelector(isRefreshingTokenSelector);
    if (isRefreshingToken) {
      setInterval(() => {
        const isRefresh = useSelector(isRefreshingTokenSelector);
        if (isRefresh === false) {
          return apiProxy(fn, ...args);
        }
      }, 1000);
    }

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
          yield* put(
            refreshAccessTokenSuccessAction({
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            }),
          );
          return yield apiProxy(fn, ...args);
        } else {
          console.log('refreshToken expired');
          yield* put(logOutAction());
        }
      } catch (err) {
        throw err;
      }
    } else {
      throw error;
    }
  }
}
