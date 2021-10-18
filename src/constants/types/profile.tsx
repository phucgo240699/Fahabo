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

export type UpdateLanguageRequestType = {
  languageCode?: string;
};

export type UpdatePasswordRequestType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UpdateProfileAvatarRequestType = {
  avatar: {
    name?: string;
    base64Data?: string;
  };
};

export type GetMyProfileRequestType = {
  id?: number;
};

//
// Response
//
export type GetAvatarResponseType = {uri: string};

export type UpdatePasswordResponseType = {
  password?: string;
};

export type UpdateProfileAvatarResponseType = {
  avatar: {
    name?: string;
    uri?: string;
  };
};
