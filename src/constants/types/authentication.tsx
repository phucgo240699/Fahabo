//
// Enum
//
export enum AuthType {
  MANUAL_AUTH = 'MANUAL_AUTH',
  APPLE_AUTH = 'APPLE_AUTH',
  GOOGLE_AUTH = 'GOOGLE_AUTH',
  FACEBOOK_AUTH = 'FACEBOOK_AUTH',
}

//
// Request
//
export type SignInRequestType = {
  username?: string;
  password?: string;
};

export type RefreshAccessTokenRequestType = {
  refreshToken?: string;
};

export type SignUpRequestType = {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
  authType: AuthType;
};

export type GetOTPRequestType = {
  username?: string;
};

export type VerifyUsernameRequestType = {
  otp?: string;
  username?: string;
  password?: string;
};

export type ForgotPasswordRequestType = {
  otp?: string;
  username?: string;
  password?: string;
  repeatPassword?: string;
};

export type AddFCMTokenRequestType = {
  firebaseToken: string;
};

export type LogOutRequestType = {
  firebaseToken?: string;
};

//
// Response
//
export type AuthenticationResponseType = {
  id?: number;
  // contactId?: number;
  email?: string;
  password?: string;
  name?: string;
  username?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
  avatarUrl?: string;
  rawAvatarUrl?: string;
  totalFamilies?: number;
  authType?: {
    id?: AuthType;
    name?: string;
  };
  // isValidEmail?: boolean;
  // isValidPhoneNumber?: boolean;
};

export type CountryCodeResponseType = {
  data: Record<string, string>[];
};

export type RefreshAccessTokenResponseType = {
  accessToken?: string;
  refreshToken?: string;
};
