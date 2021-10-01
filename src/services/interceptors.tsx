import i18n from '@locales/index';
import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  console.log({response: response.data});
  return Promise.resolve(response);
};

export const errorInterceptor = (error: AxiosError) => {
  console.log({error: error.message});
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  console.log({config});
  return config;
};
