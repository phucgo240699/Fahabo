import React from 'react';
import {Box} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {}

const MyEventsScreen: React.FC<Props> = ({}) => {
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
        <Container>
          <ProfileHeader title={i18n.t('profile.myEvents')} />
        </Container>
      </Touch>
    </Box>
  );
};

const Touch = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  flex: 1;
`;

export default MyEventsScreen;
