import {CallEffect} from '@redux-saga/core/effects';
import {AxiosResponse} from 'axios';
import {call, SagaGenerator} from 'typed-redux-saga';

export function* apiProxy(fn: any, ...args: any[]): any {
  try {
    return yield call(fn, ...args);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
