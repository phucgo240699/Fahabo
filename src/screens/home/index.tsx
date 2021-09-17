import React from 'react';
import {Box} from 'native-base';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  return (
    <Box flex={1} safeArea pt={4} bgColor={colors.WHITE}>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      {/* <PrimaryDrawerHeader title={i18n.t('home.home')} /> */}
    </Box>
  );
};

export default HomeScreen;
