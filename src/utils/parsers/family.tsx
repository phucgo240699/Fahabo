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
  return {
    id: get('familyId', rawData),
    thumbnail: get('thumbnail', rawData),
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
  return {
    id: get('id', rawData),
    name: get('name', rawData),
    phoneNumber: get('phoneNumber', rawData),
    avatar: `${BASE_DOMAIN}${get('avatar', rawData)}`,
    isHost: get('isHost', rawData),
  };
}
