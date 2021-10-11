import {get} from 'lodash/fp';

//
// Request
//
export const parseVerifyUsernameRequest = (rawData: any) => {
  return {
    otp: get('otp', rawData),
    username: get('username', rawData),
  };
};

export const parseVerifyForgotPasswordRequest = (rawData: any) => {
  return {
    otp: get('otp', rawData),
    username: get('username', rawData),
  };
};

//
// Response
//
export const parseRefreshAccessTokenResponse = (rawData: any) => {
  return {
    accessToken: get('accessToken', rawData),
    refreshToken: get('refreshToken', rawData),
  };
};
export const parseSignInResponse = (rawData: any) => {
  return {
    user: {
      // id: get('user.id', rawData),
      // contactId: get('user.contactId', rawData),
      email: get('user.email', rawData),
      password: get('password', rawData),
      name: get('user.name', rawData),
      username: get('user.username', rawData),
      phoneNumber: get('user.phoneNumber', rawData),
      birthday: get('user.birthday', rawData),
      languageCode: get('user.languageCode', rawData),
      avatarUrl: get('user.avatar', rawData),
      authType: {
        id: get('user.authType.id', rawData),
        name: get('user.authType.name', rawData),
      },
      // isValidEmail: get('user.isValidEmail', rawData),
      // isValidPhoneNumber: get('user.isValidPhoneNumber', rawData),
    },
    accessToken: get('access_token', rawData),
    refreshToken: get('refresh_token', rawData),
  };
};

export const parseSignUpResponse = (rawData: any) => {
  return {
    // id: get('id', rawData),
    // contactId: get('contactId', rawData),
    email: get('email', rawData),
    password: get('password', rawData),
    name: get('name', rawData),
    username: get('username', rawData),
    phoneNumber: get('phoneNumber', rawData),
    birthday: get('birthday', rawData),
    languageCode: get('languageCode', rawData),
    avatarUrl: get('avatar', rawData),
    authType: {
      id: get('authType.id', rawData),
      name: get('authType.name', rawData),
    },
    // isValidEmail: get('isValidEmail', rawData),
    // isValidPhoneNumber: get('isValidPhoneNumber', rawData),
  };
};

export const parseVerifyResponse = (rawData: any) => {
  return {
    user: {
      // id: get('user.id', rawData),
      // contactId: get('user.contactId', rawData),
      email: get('user.email', rawData),
      password: get('password', rawData),
      name: get('user.name', rawData),
      username: get('user.username', rawData),
      phoneNumber: get('user.phoneNumber', rawData),
      birthday: get('user.birthday', rawData),
      languageCode: get('user.languageCode', rawData),
      avatarUrl: get('user.avatar', rawData),
      authType: {
        id: get('user.authType.id', rawData),
        name: get('user.authType.name', rawData),
      },
      // isValidEmail: get('user.isValidEmail', rawData),
      // isValidPhoneNumber: get('user.isValidPhoneNumber', rawData),
    },
    accessToken: get('access_token', rawData),
    refreshToken: get('refresh_token', rawData),
  };
};

export const parseUpdateProfileResponse = (rawData: any) => {
  return {
    // id: get('id', rawData),
    // contactId: get('contactId', rawData),
    email: get('email', rawData),
    name: get('name', rawData),
    username: get('username', rawData),
    phoneNumber: get('phoneNumber', rawData),
    birthday: get('birthday', rawData),
    languageCode: get('languageCode', rawData),
    avatarUrl: get('avatar', rawData),
    authType: {
      id: get('authType.id', rawData),
      name: get('authType.name', rawData),
    },
    // isValidEmail: get('isValidEmail', rawData),
    // isValidPhoneNumber: get('isValidPhoneNumber', rawData),
  };
};
