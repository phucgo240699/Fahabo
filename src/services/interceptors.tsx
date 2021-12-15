import i18n from '@locales/index';
import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  if (__DEV__) {
    console.log({
      API_RESPONSE: {
        url: response.config.url,
        response: response.data.data,
        statusCode: response.status,
      },
    });
  }
  return Promise.resolve(response);
};

export const errorInterceptor = (error: AxiosError) => {
  if (__DEV__) {
    // console.log({API_ERROR: error.message});
  }
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  if (__DEV__) {
    console.log({
      API_CONFIG: {
        url: config.url,
        body: config.data,
        method: config.method,
        accessToken: config.headers.Authorization,
      },
    });
  }
  return config;
};
