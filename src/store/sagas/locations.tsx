import {
  GetMemberLocationsRequestType,
  UpdateNewLocationRequestType,
} from '@constants/types/locations';
import {getMemberLocationsApi, updateNewLocationApi} from '@services/locations';
import {
  getMemberLocationsRequestAction,
  getMemberLocationsSuccessAction,
  GET_MEMBER_LOCATIONS_REQUEST,
  updateMemberLocationsAction,
  UPDATE_NEW_LOCATION_REQUEST,
} from '@store/actionTypes/locations';
import {closeHUDAction, showHUDAction} from '@store/actionTypes/session';
import {focusFamilySelector} from '@store/selectors/family';
import {regionSelector} from '@store/selectors/locations';
import {isNull} from '@utils/index';
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
    if (body.showHUD === true) {
      yield* put(showHUDAction());
    }
    const response = yield* apiProxy(updateNewLocationApi, body);
    if (response.status === 200) {
      const focusFamily = yield* select(focusFamilySelector);
      if (!isNull(focusFamily?.id)) {
        yield* put(
          getMemberLocationsRequestAction({
            familyId: focusFamily?.id,
            showHUD: body.showHUD,
            onlyMemberLocations: body.onlyMemberLocations,
          }),
        );
      }
    }
  } catch (error) {
  } finally {
    if (body.showHUD === true) {
      yield* put(closeHUDAction());
    }
  }
}

function* getMemberLocationsSaga({
  body,
}: {
  type: string;
  body: GetMemberLocationsRequestType;
}) {
  try {
    if (body.showHUD === true) {
      yield* put(showHUDAction());
    }
    const response = yield* apiProxy(getMemberLocationsApi, body);
    if (response.status === 200) {
      const memberLocations = parseMemberLocations(parseDataResponse(response));
      if (memberLocations.length > 0) {
        const region = calculateRegionForCoordinates(memberLocations);
        if (body.onlyMemberLocations === true) {
          yield* put(updateMemberLocationsAction(memberLocations));
        } else {
          yield* put(
            getMemberLocationsSuccessAction({region, memberLocations}),
          );
        }
      }
    }
  } catch (error) {
  } finally {
    if (body.showHUD === true) {
      yield* put(closeHUDAction());
    }
  }
}

export default function* () {
  yield* all([
    takeLeading(UPDATE_NEW_LOCATION_REQUEST, updateLocationSaga),
    takeLeading(GET_MEMBER_LOCATIONS_REQUEST, getMemberLocationsSaga),
  ]);
}
