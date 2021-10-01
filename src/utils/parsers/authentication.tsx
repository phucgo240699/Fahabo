import {get} from 'lodash/fp';

export const parseSignInResponse = (rawData: any) => {
  return {
    user: {
      id: get('accessToken', rawData),
      contactId: get('accessToken', rawData),
      email: get('accessToken', rawData),
      password: get('accessToken', rawData),
      name: get('accessToken', rawData),
      username: get('accessToken', rawData),
      phoneNumber: get('accessToken', rawData),
      birthday: get('accessToken', rawData),
      languageCode: get('accessToken', rawData),
      isValidEmail: get('accessToken', rawData),
      isValidPhoneNumber: get('accessToken', rawData),
    },
    accessToken: get('accessToken', rawData),
    refreshToken: get('refreshToken', rawData),
  };
};
