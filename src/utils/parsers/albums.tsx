import {get} from 'lodash/fp';
import {isNull} from '@utils/index';
import {AlbumType, PhotoType} from '@constants/types/albums';
import {BASE_DOMAIN} from '@constants/Constants';

export function parseAlbums(rawData: any[]): AlbumType[] {
  const result: AlbumType[] = rawData.map((item, index) => {
    return parseAlbum({...item, index: index});
  });
  return result;
}

export function parseAlbum(rawData: any): AlbumType {
  const rawUri = get('uri', rawData);
  const id = get('id', rawData);
  const index = get('index', rawData);
  const title = get('title', rawData);
  const uri = isNull(rawUri)
    ? rawUri
    : rawUri.includes('http')
    ? rawUri
    : `${BASE_DOMAIN}${rawUri}`;
  const description = get('description', rawData);
  const totalPhotos = get('totalPhotos', rawData);

  return {
    id,
    index,
    title,
    uri,
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
  const rawUri: string = `${get('uri', rawData)}`;
  const id = get('id', rawData);
  const uri = rawUri.includes('http') ? rawUri : `${BASE_DOMAIN}${rawUri}`;
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
