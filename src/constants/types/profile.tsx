//
// Request
//
export type UpdateProfileRequestType = {
  email?: string;
  name?: string;
  phoneNumber?: string;
  birthday?: string;
  languageCode?: string;
};

export type UpdatePasswordRequestType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UpdateProfileAvatarRequestType = {};

//
// Response
//
export type GetAvatarResponseType = {uri: string};

export type UpdatePasswordResponseType = {
  password?: string;
};

export type UpdateProfileAvatarResponseType = {};
