//
// Request
//
export type CreateAlbumRequestType = {
  familyId?: number;
  title?: string;
  description?: string;
};
export type UpdateAlbumRequestType = {
  albumId?: number;
  title?: string;
  description?: string;
};

export type DeleteAlbumRequestType = {
  albumId?: number;
};

export type GetAlbumsRequestType = {
  showHUD?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  searchText?: string;
  page?: number;
  size?: number;
};

export type AddPhotosRequestType = {
  albumId?: number;
  photos?: {
    name?: string;
    base64Data?: string;
  }[];
};

export type UpdatePhotoRequestType = {
  photoId?: string;
  base64Data?: string;
};

export type DeletePhotosRequestType = {
  albumId?: number;
  photoIds: number[];
};

export type GetPhotosRequestType = {
  showHUD?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  albumId?: number;
  page?: number;
  size?: number;
};

export type GetPreviewAlbumRequestType = {
  familyId?: number;
};

//
// Response
//
export type AlbumType = {
  id?: number;
  index?: number;
  title?: string;
  description?: string;
  totalPhotos?: number;
};

export type PhotoType = {
  id?: number;
  uri?: string;
  index?: number;
  createdAt?: string; // DD-MM-YYYY
  updatedAt?: string; // DD-MM-YYYY
};
