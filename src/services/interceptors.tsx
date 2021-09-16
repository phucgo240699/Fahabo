import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  if (response.status === 400 || response.status === 401) {
    const customError = new Error('Error 404');
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
