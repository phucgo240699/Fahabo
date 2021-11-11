import React from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {BarCodeReadEvent} from 'react-native-camera';
import styled from 'styled-components/native';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Box} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import PrimaryButton from '@components/PrimaryButton';
import {galleryIcon} from '@constants/sources';
import {launchImageLibrary} from 'react-native-image-picker';
import {isNull} from '@utils/index';
import RNQRGenerator from 'rn-qr-generator';
import {QR_SALT_CODE} from '@constants/Constants';
import {useDispatch} from 'react-redux';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {joinFamilyRequestAction} from '@store/actionTypes/family';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CommonActions, useNavigation} from '@react-navigation/native';

const ScanFamilyQRScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSuccess = (e: BarCodeReadEvent) => {
    const [qrSaltCode, familyId] = e.data.split('_');
    if (qrSaltCode === QR_SALT_CODE) {
      // TODO: request API
      dispatch(joinFamilyRequestAction({familyId: parseInt(familyId)}));
    } else {
      dispatch(
        showToastAction(i18n.t('errorMessage.qrCodeInvalid'), ToastType.ERROR),
      );
    }
    navigation.dispatch(CommonActions.goBack());
  };

  const onPressQRCode = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, response => {
      if (response.assets !== undefined && !isNull(response.assets[0]?.uri)) {
        RNQRGenerator.detect({uri: response.assets[0]?.uri})
          .then(response => {
            const {values} = response; // Array of detected QR code values. Empty if nothing found.
            if (!isNull(values)) {
              const [qrSaltCode, familyId] = values[0].split('_');
              if (qrSaltCode === QR_SALT_CODE) {
                // TODO: request API
                dispatch(
                  joinFamilyRequestAction({familyId: parseInt(familyId)}),
                );
              } else {
                dispatch(
                  showToastAction(
                    i18n.t('errorMessage.qrCodeInvalid'),
                    ToastType.ERROR,
                  ),
                );
              }
            } else {
              dispatch(
                showToastAction(
                  i18n.t('errorMessage.qrCodeInvalid'),
                  ToastType.ERROR,
                ),
              );
            }
          })
          .catch(error => {
            console.log({error});

            dispatch(
              showToastAction(
                i18n.t('errorMessage.qrCodeInvalid'),
                ToastType.ERROR,
              ),
            );
          });
      }
    });
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
        rightComponent={
          <PrimaryButton
            marginRight={8}
            leftSource={galleryIcon}
            leftTintColor={colors.THEME_COLOR_6}
            onPress={onPressQRCode}
          />
        }
      />
      <Box flex={1} bgColor={colors.CAMERA_BACKGROUND}>
        <QRCodeScanner onRead={onSuccess} />
      </Box>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
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
