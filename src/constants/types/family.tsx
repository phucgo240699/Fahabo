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
  getting?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  searchText?: string;
  page?: number;
  size?: number;
};

export type GetFamilyMembersForCallRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  page?: number;
  size?: number;
};

export type GetChoreFilterMembersRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  familyId?: number;
  searchText?: string;
};

export type GetEventFilterMembersRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  familyId?: number;
  searchText?: string;
};

export type GetMyFamiliesRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  refresh?: boolean;
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
export enum MemberStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
}
export type MemberType = {
  id?: number;
  name?: string;
  phoneNumber?: string;
  avatar?: string;
  isHost?: boolean;
  status?: MemberStatus;
};
