import {AlbumType, PhotoType} from '@constants/types/albums';

export const mixAlbums = (oldData: AlbumType[], newData: AlbumType[]) => {
  var oldIds = new Set(oldData.map(item => item.id));
  var merged = [...oldData, ...newData.filter(item => !oldIds.has(item.id))];
  return merged;
};

export const mixPhotos = (oldData: PhotoType[], newData: PhotoType[]) => {
  var oldIds = new Set(oldData.map(item => item.id));
  var merged = [...oldData, ...newData.filter(item => !oldIds.has(item.id))];
  return merged;
};
