import React from 'react';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';

interface Props {}

const MediaPickerScreen: React.FC<Props> = ({}) => {
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.BLACK}
      />
      <AuthenticationHeader />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.BLACK};
`;

export default MediaPickerScreen;
