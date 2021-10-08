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
  repeatNewPassword: string;
};

export type UpdateProfileAvatarRequestType = {};

//
// Response
//
export type UpdatePasswordResponseType = {};

export type UpdateProfileAvatarResponseType = {};
