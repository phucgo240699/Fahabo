//
// Request
//
export type CreateFamilyRequestType = {
  familyName?: string;
  ids?: number[];
  thumbnail?: {
    name?: string;
    base64Data?: string;
  };
};

export type JoinFamilyRequestType = {
  familyId?: number;
};

export type LeaveFamilyRequestType = {
  familyId?: number;
};

export type KickFamilyMemberRequestType = {
  familyId?: number;
  userIdToKick?: number;
};

export type GetFamilyMembersRequestType = {
  showHUD?: boolean;
  loadMore?: boolean;
  familyId?: number;
  page?: number;
  size?: number;
};

export type GetMyFamiliesRequestType = {
  showHUD?: boolean;
  loadMore?: boolean;
  searchText?: string;
  page?: number;
  size?: number;
};

export type GetFamilyDetailRequestType = {
  familyId?: number;
};

export type UpdateFamilyThumbnailRequestType = {
  familyId?: number;
  thumbnail: {
    base64Data?: string;
  };
};

export type UpdateFamilyInfoRequestType = {
  familyId?: number;
  name?: string;
};

//
// Response
//

export type FamilyType = {
  id?: number;
  thumbnail?: string;
  name?: string;
  totalMembers?: number;
};
export type MemberType = {
  id?: number;
  name?: string;
  phoneNumber?: string;
  avatar?: string;
};
