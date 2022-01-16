import i18n from '@locales/index';
import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  return Promise.resolve(response);
};

export const errorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  return config;
};
