import {AuthenticationResponseType} from '@constants/types/authentication';
import {BASE_DOMAIN} from '@constants/Constants';
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
export function parseUser(rawData: any): AuthenticationResponseType {
  return {
    id: parseInt(get('id', rawData)),
    email: get('email', rawData),
    password: get('password', rawData),
    name: get('name', rawData),
    username: get('username', rawData),
    phoneNumber: get('phoneNumber', rawData),
    birthday: get('birthday', rawData),
    languageCode: get('languageCode', rawData),
    avatarUrl: `${BASE_DOMAIN}${get('avatar', rawData)}`,
    totalFamilies: get('familyNum', rawData),
    authType: {
      id: get('authType.id', rawData),
      name: get('authType.name', rawData),
    },
  };
}
export const parseSignInResponse = (rawData: any) => {
  return {
    user: {
      ...parseUser(rawData.user),
      password: get('password', rawData),
    },
    accessToken: get('accessToken', rawData),
    refreshToken: get('refreshToken', rawData),
  };
};

export const parseSignUpResponse = (rawData: any) => {
  return {
    ...parseUser(rawData),
    password: get('password', rawData),
  };
};

export const parseVerifyResponse = (rawData: any) => {
  return {
    user: {
      ...parseUser(rawData.user),
      password: get('password', rawData),
    },
    accessToken: get('accessToken', rawData),
    refreshToken: get('refreshToken', rawData),
  };
};

export const parseUpdateProfileResponse = (rawData: any) => {
  return {
    ...parseUser(rawData.user),
  };
};
