export type AuthenticationResponseType = {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
};

export type SignInRequestType = {
  username?: string;
  password?: string;
};

export type SignUpRequestType = {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
};

export type VerifyEmailRequestType = {
  otp?: string;
};

export type RefreshAccessTokenRequestType = {
  refreshToken?: string;
};

export type RefreshAccessTokenResponseType = {
  accessToken?: string;
  refreshToken?: string;
};
