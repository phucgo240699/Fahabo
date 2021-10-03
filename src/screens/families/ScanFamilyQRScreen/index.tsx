import React, {useEffect, useState} from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {BarCodeReadEvent} from 'react-native-camera';
import styled from 'styled-components/native';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Box} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanFamilyQRScreen = () => {
  const onSuccess = (e: BarCodeReadEvent) => {
    console.log('Got code:', e.data);
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('family.scanInstruction')}
        backgroundColor={colors.WHITE}
      />
      <Box flex={1} bgColor={colors.CAMERA_BACKGROUND}>
        <QRCodeScanner onRead={onSuccess} />
      </Box>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const SnapContainer = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  padding-bottom: 4px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.CONCRETE};
`;

export default ScanFamilyQRScreen;
