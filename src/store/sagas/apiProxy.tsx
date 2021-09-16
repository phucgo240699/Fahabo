import {call, put, select} from 'typed-redux-saga';

export function* apiCallProxy(...args: any[]): any {
  try {
    return yield call(apiCallProxy, ...args);
  } catch (error) {
    console.log(error);
  }
}
