// Request
export type UpdateNewLocationRequestType = {
  latitude?: number;
  longitude?: number;
  firebaseToken?: string;
  showHUD?: boolean;
  onlyMemberLocations?: boolean;
};
export type GetMemberLocationsRequestType = {
  familyId?: number;
  showHUD?: boolean;
  onlyMemberLocations?: boolean;
};

// Data
export type MemberLocationType = {
  latitude: number;
  longitude: number;
  avatar?: string;
  name?: string;
};

export type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
