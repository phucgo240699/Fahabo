import React, {memo} from 'react';
import {Box} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryDrawerHeader from '@components/PrimaryDrawerHeader';

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
    </Box>
  );
};

export default memo(ProfileScreen);
