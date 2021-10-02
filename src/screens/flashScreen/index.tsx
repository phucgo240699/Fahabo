import React, {useEffect} from 'react';
import {Box} from 'native-base';
import PrimaryIcon from '@components/PrimaryIcon';
import {appIcon} from '@constants/sources';
import {useDispatch, useSelector} from 'react-redux';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {autoSignInRequestAction} from '@store/actionTypes/signIn';
import {userSelector} from '@store/selectors/authentication';
import {getDefaultLanguageCode} from '@utils/index';
import colors from '@themes/colors';

const FlashScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    setTimeout(() => {
      // Device language
      i18n.locale = getDefaultLanguageCode();
      i18n.defaultLocale = getDefaultLanguageCode();

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
      bgColor={colors.FLASH_SCREEN}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.FLASH_SCREEN}
      />
      <PrimaryIcon width={256} height={256} source={appIcon} />
    </Box>
  );
};

export default FlashScreen;
