import {get} from 'lodash/fp';

export const parseVerifyUsernameRequest = (rawData: any) => {
  return {
    otp: get('otp', rawData),
    username: get('username', rawData),
  };
};

export const parseSignInResponse = (rawData: any) => {
  return {
    user: {
      id: get('user.id', rawData),
      contactId: get('user.contactId', rawData),
      email: get('user.email', rawData),
      password: get('password', rawData),
      name: get('user.name', rawData),
      username: get('user.username', rawData),
      phoneNumber: get('user.phoneNumber', rawData),
      birthday: get('user.birthday', rawData),
      languageCode: get('user.languageCode', rawData),
      isValidEmail: get('user.isValidEmail', rawData),
      isValidPhoneNumber: get('user.isValidPhoneNumber', rawData),
    },
    accessToken: get('accessToken', rawData),
    refreshToken: get('refreshToken', rawData),
  };
};

export const parseSignUpResponse = (rawData: any) => {
  return {
    id: get('id', rawData),
    contactId: get('contactId', rawData),
    email: get('email', rawData),
    password: get('password', rawData),
    name: get('name', rawData),
    username: get('username', rawData),
    phoneNumber: get('phoneNumber', rawData),
    birthday: get('birthday', rawData),
    languageCode: get('languageCode', rawData),
    isValidEmail: get('isValidEmail', rawData),
    isValidPhoneNumber: get('isValidPhoneNumber', rawData),
  };
};

export const parseVerifyResponse = (rawData: any) => {
  return {
    user: {
      id: get('user.id', rawData),
      contactId: get('user.contactId', rawData),
      email: get('user.email', rawData),
      password: get('password', rawData),
      name: get('user.name', rawData),
      username: get('user.username', rawData),
      phoneNumber: get('user.phoneNumber', rawData),
      birthday: get('user.birthday', rawData),
      languageCode: get('user.languageCode', rawData),
      isValidEmail: get('user.isValidEmail', rawData),
      isValidPhoneNumber: get('user.isValidPhoneNumber', rawData),
    },
    accessToken: get('accessToken', rawData),
    refreshToken: get('refreshToken', rawData),
  };
};
