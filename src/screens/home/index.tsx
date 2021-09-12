import React, {memo} from 'react';
import i18n from '@locales/index';
import {Box, Button} from 'native-base';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryDrawerHeader from '@components/PrimaryDrawerHeader';
import {navigateReset} from '@navigators/index';
import {StackName} from '@constants/Constants';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const logOut = () => {
    navigateReset(StackName.AuthenticationStack);
  };
  return (
    <Box flex={1} safeArea pt={4} bgColor={colors.WHITE}>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <PrimaryDrawerHeader title={i18n.t('home.home')} />
      <Button
        mt={10}
        width={200}
        alignSelf={'center'}
        // backgroundColor={Colors.THEME_COLOR_5}
        _text={{color: 'white'}}
        onPress={logOut}>
        Log out
      </Button>
    </Box>
  );
};

export default memo(HomeScreen);
