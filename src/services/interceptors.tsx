import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  if (response.status === 400) {
    const customError = new Error('400: Validation Error');
    return Promise.reject(customError);
  } else if (response.status === 401) {
    const customError = new Error('401: Authentication Error');
    return Promise.reject(customError);
  } else if (response.status === 401) {
    const customError = new Error('500: Internal Error');
    return Promise.reject(customError);
  }
  return Promise.resolve(response);
};

export const errorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  return config;
};
