import React, {memo} from 'react';
import {Box, Button} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryDrawerHeader from '@components/PrimaryDrawerHeader';
import {navigateReset} from '@navigators/index';
import {StackName} from '@constants/Constants';

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  return (
    <Box flex={1} safeArea pt={4} bgColor={colors.WHITE}>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      {/* <PrimaryDrawerHeader title={i18n.t('profile.profile')} /> */}
      <Button
        mt={5}
        _text={{color: colors.WHITE}}
        onPress={() => {
          navigateReset(StackName.AuthenticationStack);
        }}>
        Log out
      </Button>
    </Box>
  );
};

export default memo(ProfileScreen);
