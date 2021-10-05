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

//
// Response
//
export type AuthenticationResponseType = {
  id?: number;
  contactId?: number;
  email?: string;
  password?: string;
  name?: string;
  username?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
  isValidEmail?: boolean;
  isValidPhoneNumber?: boolean;
};

export type CountryCodeResponseType = {
  data: Record<string, string>[];
};

export type RefreshAccessTokenResponseType = {
  accessToken?: string;
  refreshToken?: string;
};
