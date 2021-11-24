import i18n from '@locales/index';
import {openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {MemberLocationType, RegionType} from '@constants/types/locations';

export const hasPermissionIOS = async () => {
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  } else if (status === 'denied') {
    openLocationSettings();
  }

  return false;
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  console.log({hasPermission});
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  console.log({status});
  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else if (status === PermissionsAndroid.RESULTS.DENIED) {
    openLocationSettings();
  }

  return false;
};

export const openLocationSettings = () => {
  Alert.alert(i18n.t('location.accessLocationInUse'), '', [
    {
      text: i18n.t('media.deny'),
      onPress: () => {},
      style: 'destructive',
    },
    {
      text: i18n.t('media.allow'),
      onPress: () => {
        openSettings();
      },
      style: 'default',
    },
  ]);
};

// Calculate Region
export function calculateRegionForCoordinates(
  points: MemberLocationType[],
): RegionType {
  // points should be an array of { latitude: X, longitude: Y }
  let minX = 0.0,
    maxX = 0.0,
    minY = 0.0,
    maxY = 0.0;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
}
