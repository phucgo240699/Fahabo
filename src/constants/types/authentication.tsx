export type AuthenticationResponseType = {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
};

export type SignInBodyRequestType = {
  username?: string;
  password?: string;
};

export type SignUpBodyRequestType = {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
};
