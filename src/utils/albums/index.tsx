import {AlbumType, PhotoType} from '@constants/types/albums';

export const mixAlbums = (oldData: AlbumType[], newData: AlbumType[]) => {
  let uniqueData = new Set<AlbumType>(oldData);
  let result: AlbumType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};

export const mixPhotos = (oldData: PhotoType[], newData: PhotoType[]) => {
  let uniqueData = new Set<PhotoType>(oldData);
  let result: PhotoType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};
