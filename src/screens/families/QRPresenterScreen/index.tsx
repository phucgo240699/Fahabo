import React from 'react';
import {Box} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {appIcon, closeIcon} from '@constants/sources';
import QRCode from 'react-native-qrcode-svg';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {CommonActions, useNavigation} from '@react-navigation/native';
import PrimaryButton from '@components/PrimaryButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {QR_SALT_CODE} from '@constants/Constants';

interface Props {
  route?: any;
}

const QRPresenterScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  return (
    <Box
      flex={1}
      safeArea
      alignItems={'flex-start'}
      bgColor={colors.FLASH_SCREEN}>
      <PrimaryButton
        marginTop={5}
        marginLeft={10}
        onPress={onPressBack}
        leftSource={closeIcon}
        leftTintColor={colors.WHITE}
      />
      <Box
        flex={1}
        alignSelf={'center'}
        alignItems={'center'}
        justifyContent={'center'}>
        <FocusAwareStatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={colors.FLASH_SCREEN}
        />
        <Box
          p={7}
          borderRadius={16}
          alignItems={'center'}
          justifyContent={'center'}
          bgColor={colors.WHITE}>
          <Box
            p={1}
            // borderRadius={16}
            alignItems={'center'}
            justifyContent={'center'}
            bgColor={'#ffffff'}>
            {route && route.params && route.params.value && (
              <>
                {route.params.iconUri ? (
                  <QRCode
                    size={200}
                    logoSize={48}
                    logo={{uri: route.params.iconUri}}
                    logoBorderRadius={24}
                    value={`${QR_SALT_CODE}_${route.params.value}`}
                  />
                ) : (
                  <QRCode
                    size={200}
                    logoSize={48}
                    logo={appIcon}
                    logoBorderRadius={24}
                    value={`${QR_SALT_CODE}_${route.params.value}`}
                  />
                )}
              </>
            )}
          </Box>
          {route && route.params && route.params.instruction && (
            <InstructionText>{route.params.instruction}</InstructionText>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const InstructionText = styled(fonts.PrimaryFontRegularSize16)`
  margin-top: 30px;
`;

export default QRPresenterScreen;
