import React, {memo} from 'react';
import {Box, Text} from 'native-base';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';

interface Props {}

const ChoresScreen: React.FC<Props> = () => {
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Touch onPress={onDismissKeyboard}>
        <Container />
      </Touch>
    </Box>
  );
};

const Touch = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  flex: 1;
`;

export default memo(ChoresScreen);
