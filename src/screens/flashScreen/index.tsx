import React, {useEffect} from 'react';
import {Box} from 'native-base';
import PrimaryIcon from '@components/PrimaryIcon';
import {appIcon} from '@constants/sources';
import {useSelector} from 'react-redux';
import i18n from '@locales/index';
import {userSelector} from '@store/selectors/authentication';
import {navigate} from '@navigators/index';
import {StackName} from '@constants/Constants';
import {signIn} from '@services/signIn';
import {isNull} from '@utils/index';
import {NativeModules, Platform} from 'react-native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

const FlashScreen = () => {
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

      // Auto login & user language
      if (!isNull(user) && !isNull(user?.email) && !isNull(user?.password)) {
        signIn({
          username: user?.email,
          password: user?.password,
        }).then(response => {
          if (response.status === 200) {
            if (response.data.languageCode) {
              i18n.locale = response.data.languageCode;
              i18n.defaultLocale = response.data.languageCode;
            }
            navigate(StackName.MainStack);
            return;
          }
        });
      }

      navigate(StackName.AuthenticationStack);
    }, 2000);
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
