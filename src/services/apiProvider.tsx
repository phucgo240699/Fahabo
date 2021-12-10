import moment from 'moment-timezone';
import {BASE_URL} from '@constants/Constants';
import axios, {AxiosRequestConfig} from 'axios';
import {
  responseInterceptor,
  errorInterceptor,
  requestInterceptor,
} from './interceptors';

const baseAxios = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return (
      status === 200 ||
      status === 400 ||
      status === 401 ||
      status === 403 ||
      status === 500
    );
  },
});

baseAxios.interceptors.request.use(requestInterceptor, errorInterceptor);
baseAxios.interceptors.response.use(responseInterceptor, errorInterceptor);

export enum AcceptType {
  json = 'application/json',
  formData = 'multipart/form-data',
  urlEncode = 'application/x-www-form-urlencoded',
}

const defaultHeader = {
  Accept: AcceptType.json,
  'Content-Type': AcceptType.json,
  TimeZone: moment.tz.guess(),
};

const formHeader = {
  Accept: AcceptType.formData,
  'Content-Type': AcceptType.formData,
};

export class apiProvider {
  config: AxiosRequestConfig;
  headers: any;

  constructor(accessToken?: string) {
    const authHeader =
      accessToken && accessToken.length > 0
        ? {Authorization: 'Bearer ' + accessToken}
        : null;

    this.config = {};
    this.headers = {
      // ...formHeader,
      ...authHeader,
      ...defaultHeader,
    };
  }

  get = (url: string, headers?: any) => {
    return baseAxios.get(url, {
      ...this.config,
      // data: body,
      headers: {
        ...this.headers,
        ...headers,
      },
    });
  };

  post = (url: string, body?: any, headers?: any) => {
    return baseAxios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
    });
  };

  // postForm = (url: string, body?: any, headers?: any) => {
  //   return baseAxios.post(url, body, {
  //     ...this.config,
  //     headers: {
  //       ...this.headers,
  //       ...formHeader,
  //       ...headers,
  //     },
  //   });
  // };

  delete = (url: string, body?: any, headers?: any) => {
    return baseAxios.delete(url, {
      ...this.config,
      data: body,
      headers: {
        ...this.headers,
        ...headers,
      },
    });
  };

  put = (url: string, body?: any, headers?: any) => {
    return baseAxios.put(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
    });
  };
}
