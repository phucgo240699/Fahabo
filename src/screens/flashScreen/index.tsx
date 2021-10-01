import React, {useEffect} from 'react';
import {Box} from 'native-base';
import PrimaryIcon from '@components/PrimaryIcon';
import {appIcon} from '@constants/sources';
import {useDispatch, useSelector} from 'react-redux';
import i18n from '@locales/index';
import {NativeModules, Platform} from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {autoSignInRequestAction} from '@store/actionTypes/signIn';
import {userSelector} from '@store/selectors/authentication';

const FlashScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    setTimeout(() => {
      // Device language
      i18n.locale = `${
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
          : NativeModules.I18nManager.localeIdentifier
      }`.split('_')[0];
      i18n.defaultLocale = `${
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
          : NativeModules.I18nManager.localeIdentifier
      }`.split('_')[0];

      dispatch(
        autoSignInRequestAction({
          username: user?.username,
          password: user?.password,
        }),
      );
    }, 1000);
  }, []);

  return (
    <Box
      flex={1}
      safeArea
      alignItems={'center'}
      justifyContent={'center'}
      bgColor={'#FFDE59'}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'#FFDE59'}
      />
      <PrimaryIcon width={256} height={256} source={appIcon} />
    </Box>
  );
};

export default FlashScreen;
