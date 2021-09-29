import React, {useEffect} from 'react';
import {Box} from 'native-base';
import PrimaryIcon from '@components/PrimaryIcon';
import {appIcon} from '@constants/sources';
import {useSelector} from 'react-redux';
import i18n from '@locales/index';
import {languageCodeSelector} from '@store/selectors/authentication';
import {navigate} from '@navigators/index';
import {StackName} from '@constants/Constants';

const FlashScreen = () => {
  const languageCode = useSelector(languageCodeSelector);
  useEffect(() => {
    i18n.locale = languageCode;
    i18n.defaultLocale = languageCode;
    setTimeout(() => {
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
      <PrimaryIcon width={256} height={256} source={appIcon} />
    </Box>
  );
};

export default FlashScreen;
