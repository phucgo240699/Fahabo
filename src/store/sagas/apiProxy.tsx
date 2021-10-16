import {
  logOutAction,
  refreshAccessTokenSuccessAction,
} from '../actionTypes/signIn';
import {call, delay, put, select} from 'typed-redux-saga';
import {refreshAccessToken} from '@services/signIn';
import {
  accessTokenSelector,
  refreshTokenSelector,
} from '@store/selectors/authentication';
import {isRefreshingTokenSelector} from '@store/selectors/session';
import {AxiosResponse} from 'axios';
import {
  turnOffIsRefreshingTokenAction,
  turnOnIsRefreshingTokenAction,
} from '@store/actionTypes/session';
import {parseRefreshAccessTokenResponse} from '@utils/parsers/authentication';

export function* apiProxy(
  fn: (
    accessToken?: string,
    body?: any,
    header?: any,
  ) => Promise<AxiosResponse<any>>,
  body?: any,
  header?: any,
): any {
  try {
    const isRefreshingToken = yield* select(state =>
      isRefreshingTokenSelector(state),
    );
    if (isRefreshingToken) {
      yield* delay(3000);
      yield* put(turnOffIsRefreshingTokenAction());
      return yield apiProxy(fn, body, header);
    } else {
      const accessToken = yield* select(state => accessTokenSelector(state));
      const response = yield* call(fn, accessToken, body, header);
      if (response.status === 401) {
        yield* put(turnOnIsRefreshingTokenAction());
        const refreshToken = yield* select(state =>
          refreshTokenSelector(state),
        );
        const refreshResponse = yield* call(refreshAccessToken, {refreshToken});
        if (refreshResponse.status === 200) {
          yield* put(
            refreshAccessTokenSuccessAction(
              parseRefreshAccessTokenResponse(refreshResponse.data.data),
            ),
          );
          yield* put(turnOffIsRefreshingTokenAction());
          return yield apiProxy(fn, body, header);
        } else {
          yield* put(turnOffIsRefreshingTokenAction());
          yield* put(logOutAction());
          return refreshResponse;
        }
      } else {
        return response;
      }
    }
  } catch (error) {
    throw error;
  } finally {
    yield* put(turnOffIsRefreshingTokenAction());
  }
}
