import i18n from '@locales/index';
import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  console.log({API_RESPONSE: response.data});
  return Promise.resolve(response);
};

export const errorInterceptor = (error: AxiosError) => {
  console.log({API_ERROR: error.message});
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  console.log({
    API_CONFIG: {url: config.url, body: config.params},
  });
  return config;
};
