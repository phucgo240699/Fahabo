import {BASE_URL} from '@constants/Constants';
import {
  GetMemberLocationsRequestType,
  UpdateNewLocationRequestType,
} from '@constants/types/locations';
import {apiProvider} from './apiProvider';

export function updateNewLocationApi(
  accessToken?: string,
  body?: UpdateNewLocationRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/register_location`,
    body,
  );
}
export function getMemberLocationsApi(
  accessToken?: string,
  body?: GetMemberLocationsRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/locate_members`,
    body,
  );
}
