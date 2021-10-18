import {get} from 'lodash/fp';
import {FamilyType, MemberType} from '@constants/types/family';

export function parseFamilies(rawData: any[]): FamilyType[] {
  const result: FamilyType[] = rawData.map(item => {
    return {
      id: get('familyId', item),
      thumbnail: get('thumbnail', item),
      name: get('familyName', item),
      totalMembers: get('memberNum', item),
    };
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

export function parseMember(rawData: any): MemberType {
  return {
    id: get('id', rawData),
    name: get('name', rawData),
    phoneNumber: get('phoneNumber', rawData),
    avatar: get('avatar', rawData),
  };
}
