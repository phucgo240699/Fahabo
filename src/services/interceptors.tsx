import i18n from '@locales/index';
import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  // if (
  //   response.status === 400 ||
  //   response.status === 401 ||
  //   response.status === 500
  // ) {
  //   const customError = new Error(
  //     (response.data.message && response.data.message[0]) ??
  //       i18n.t('errorMessage.general'),
  //   );
  //   return Promise.reject(customError);
  // }
  return Promise.resolve(response);
};

export const errorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  return config;
};
