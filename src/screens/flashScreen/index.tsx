import React, {useEffect} from 'react';
import {Box} from 'native-base';
import PrimaryIcon from '@components/PrimaryIcon';
import {appIcon} from '@constants/sources';
import {useDispatch, useSelector} from 'react-redux';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {autoSignInRequestAction} from '@store/actionTypes/signIn';
import {userSelector} from '@store/selectors/authentication';
import colors from '@themes/colors';
import {closeHUDAction} from '@store/actionTypes/session';
import {setGlobalLocale, getDefaultLanguageCode} from '@utils/index';

const FlashScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(closeHUDAction());

    // Device language
    setGlobalLocale(getDefaultLanguageCode());

    setTimeout(() => {
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
