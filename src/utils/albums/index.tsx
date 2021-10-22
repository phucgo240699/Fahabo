import {AlbumType, PhotoType} from '@constants/types/albums';

export const mixAlbums = (oldData: AlbumType[], newData: AlbumType[]) => {
  let uniqueData = new Set<AlbumType>([]);
  let result: AlbumType[] = [];
  oldData.forEach(item => {
    uniqueData.add(item);
  });
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};

export const mixPhotos = (oldData: PhotoType[], newData: PhotoType[]) => {
  let uniqueData = new Set<PhotoType>([]);
  let result: PhotoType[] = [];
  oldData.forEach(item => {
    uniqueData.add(item);
  });
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};
