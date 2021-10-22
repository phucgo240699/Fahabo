import i18n from '@locales/index';
import {Alert, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

export const verifyCameraPermission = (onSuccess: () => void) => {
  check(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  )
    .then(checkResult => {
      if (checkResult === RESULTS.GRANTED) {
        onSuccess();
      } else if (checkResult === RESULTS.DENIED) {
        request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
          {
            title: i18n.t('media.accessCameraTitle'),
            message: i18n.t('media.accessCameraMessage'),
            buttonPositive: i18n.t('media.allow'),
            buttonNegative: i18n.t('media.deny'),
          },
        ).then(requestResult => {
          if (requestResult === RESULTS.GRANTED) {
            onSuccess;
          }
        });
      } else if (checkResult === RESULTS.BLOCKED) {
        Alert.alert(
          i18n.t('media.accessCameraTitle'),
          i18n.t('media.accessCameraMessage'),
          [
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
          ],
        );
      }
    })
    .catch(error => {});
};

export const verifyGalleryPermission = (onSuccess: () => void) => {
  check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  )
    .then(checkResult => {
      if (checkResult === RESULTS.GRANTED) {
        onSuccess();
      } else if (checkResult === RESULTS.DENIED) {
        request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          {
            title: i18n.t('media.accessCameraTitle'),
            message: i18n.t('media.accessCameraMessage'),
            buttonPositive: i18n.t('media.allow'),
            buttonNegative: i18n.t('media.deny'),
          },
        ).then(requestResult => {
          if (requestResult === RESULTS.GRANTED) {
            onSuccess;
          }
        });
      } else if (checkResult === RESULTS.BLOCKED) {
        Alert.alert(
          i18n.t('media.accessCameraTitle'),
          i18n.t('media.accessCameraMessage'),
          [
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
          ],
        );
      }
    })
    .catch(error => {});
};
