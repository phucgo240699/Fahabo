import {get} from 'lodash/fp';
import {AlbumType, PhotoType} from '@constants/types/albums';

export function parseAlbums(rawData: any[]): AlbumType[] {
  const result: AlbumType[] = rawData.map(item => {
    return parseAlbum(item);
  });
  return result;
}

export function parseAlbum(rawData: any): AlbumType {
  const id = get('id', rawData);
  const title = get('title', rawData);
  const description = get('description', rawData);
  const totalPhotos = get('totalPhotos', rawData);

  return {
    id,
    title,
    description,
    totalPhotos,
  };
}

export function parsePhotos(rawData: any[]): PhotoType[] {
  const result: PhotoType[] = rawData.map((item, index) => {
    return parsePhoto({...item, index: index});
  });
  return result;
}

export function parsePhoto(rawData: any): PhotoType {
  const id = get('id', rawData);
  const uri = get('uri', rawData);
  const index = get('index', rawData);
  const createdAt = get('createdAt', rawData);
  const updatedAt = get('updatedAt', rawData);

  return {
    id,
    uri,
    index,
    createdAt,
    updatedAt,
  };
}
