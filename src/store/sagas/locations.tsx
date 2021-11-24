import {
  GetMemberLocationsRequestType,
  UpdateNewLocationRequestType,
} from '@constants/types/locations';
import {getMemberLocationsApi, updateNewLocationApi} from '@services/locations';
import {
  getMemberLocationsSuccessAction,
  GET_MEMBER_LOCATIONS_REQUEST,
  UPDATE_NEW_LOCATION_REQUEST,
} from '@store/actionTypes/locations';
import {regionSelector} from '@store/selectors/locations';
import {calculateRegionForCoordinates} from '@utils/locations';
import {parseDataResponse} from '@utils/parsers';
import {parseMemberLocations} from '@utils/parsers/locations';
import {all, put, select, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';

function* updateLocationSaga({
  body,
}: {
  type: string;
  body: UpdateNewLocationRequestType;
}) {
  try {
    const response = yield* apiProxy(updateNewLocationApi, body);
  } catch (error) {}
}

function* getMemberLocationsSaga({
  body,
}: {
  type: string;
  body: GetMemberLocationsRequestType;
}) {
  try {
    const response = yield* apiProxy(getMemberLocationsApi, body);
    if (response.status === 200) {
      const memberLocations = parseMemberLocations(parseDataResponse(response));
      if (memberLocations.length > 0) {
        const region = calculateRegionForCoordinates(memberLocations);
        console.log('region > 0: ', region);
        console.log('memberLocations > 0: ', memberLocations);
        yield* put(getMemberLocationsSuccessAction({region, memberLocations}));
      }
      // else {
      //   const region = yield* select(regionSelector);
      //   console.log('region <= 0: ', region);
      //   console.log('memberLocations <= 0: ', memberLocations);
      //   yield* put(getMemberLocationsSuccessAction({region, memberLocations}));
      // }
    }
  } catch (error) {}
}

export default function* () {
  yield* all([
    takeLeading(UPDATE_NEW_LOCATION_REQUEST, updateLocationSaga),
    takeLeading(GET_MEMBER_LOCATIONS_REQUEST, getMemberLocationsSaga),
  ]);
}
