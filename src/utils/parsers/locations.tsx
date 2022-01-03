import {get} from 'lodash/fp';
import {MemberLocationType} from '@constants/types/locations';
import {BASE_DOMAIN} from '@constants/Constants';

export const parseMemberLocation = (rawData: any): MemberLocationType => {
  const latitude = get('latitude', rawData);
  const longitude = get('longitude', rawData);
  const avatar = `${BASE_DOMAIN}${get('avatar', rawData)}`;
  const name = get('name', rawData);

  return {
    latitude,
    longitude,
    avatar,
    name,
  };
};

export function parseMemberLocations(rawData: any[]): MemberLocationType[] {
  const result: MemberLocationType[] = rawData.map((item, index) => {
    return parseMemberLocation({...item, index: index});
  });
  return result;
}
