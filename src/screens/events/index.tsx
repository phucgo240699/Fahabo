import React, {memo} from 'react';
import {Box, Text} from 'native-base';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';

interface Props {}

const EventsScreen: React.FC<Props> = () => {
  return (
    <Box flex={1} safeArea pt={4} bgColor={colors.WHITE}>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Text>{i18n.t('events.events')}</Text>
    </Box>
  );
};

export default memo(EventsScreen);
