import {get} from 'lodash/fp';
import {FamilyType, MemberType} from '@constants/types/family';
import {BASE_DOMAIN} from '@constants/Constants';

export function parseFamilies(rawData: any[]): FamilyType[] {
  const result: FamilyType[] = rawData.map(item => {
    return parseFamily(item);
  });
  return result;
}

export function parseFamily(rawData: any): FamilyType {
  const rawThumbnail: string = `${get('thumbnail', rawData)}`;
  const thumbnail = rawThumbnail.includes('http')
    ? rawThumbnail
    : `${BASE_DOMAIN}${rawThumbnail}`;
  return {
    id: get('familyId', rawData),
    thumbnail,
    name: get('familyName', rawData),
    totalMembers: get('memberNum', rawData),
  };
}

export function parseMembers(rawData: any[]): MemberType[] {
  const result: MemberType[] = rawData.map(item => {
    return parseMember(item);
  });
  return result;
}

export function parseMember(rawData: any): MemberType {
  const rawAvatar: string = `${get('avatar', rawData)}`;
  const avatar = rawAvatar.includes('http')
    ? rawAvatar
    : `${BASE_DOMAIN}${rawAvatar}`;
  return {
    id: get('id', rawData),
    name: get('name', rawData),
    phoneNumber: get('phoneNumber', rawData),
    avatar,
    isHost: get('isHost', rawData),
  };
}
