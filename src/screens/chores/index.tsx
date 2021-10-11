import React, {memo} from 'react';
import {Box, ScrollView, Text} from 'native-base';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';

interface Props {}

const ChoresScreen: React.FC<Props> = ({}) => {
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <ScrollView scrollEventThrottle={16}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Touch onPress={onDismissKeyboard}>
        <Container>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores</Text>
          <Text color={colors.BLACK}>Chores End</Text>
        </Container>
      </Touch>
    </ScrollView>
  );
};

const Touch = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  margin: 20px;
`;

export default memo(ChoresScreen);
