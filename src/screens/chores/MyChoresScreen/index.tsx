import React from 'react';
import {Box} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Keyboard, Platform} from 'react-native';
import styled from 'styled-components/native';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {}

const MyChoresScreen: React.FC<Props> = ({}) => {
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeView>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <ProfileHeader title={i18n.t('profile.myChores')} />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

export default MyChoresScreen;
