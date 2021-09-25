import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import React from 'react';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import AuthenticationHeader from '@components/AuthenticationHeader';

interface Props {}

const CameraScreen: React.FC<Props> = ({}) => {
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

export default CameraScreen;
