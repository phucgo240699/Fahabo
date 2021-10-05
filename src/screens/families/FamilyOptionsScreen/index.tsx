import React, {useState} from 'react';
import {Box, Button, FormControl, Input, Modal} from 'native-base';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import fonts from '@themes/fonts';
import PrimaryButton from '@components/PrimaryButton';
import {closeIcon} from '@constants/sources';
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import {CommonActions, useNavigation} from '@react-navigation/native';

const FamilyOptionsScreen = () => {
  const navigation = useNavigation();
  const [showCreationModal, setShowCreationModal] = useState(false);

  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  const onOpenCreationModal = () => {
    setShowCreationModal(true);
  };
  const onCloseCreationModal = () => {
    setShowCreationModal(false);
  };
  const onPressJoinFamily = () => {
    navigate(ScreenName.ScanFamilyQRScreen);
  };
  return (
    <Box
      flex={1}
      safeArea
      alignItems={'center'}
      justifyContent={'center'}
      bgColor={colors.FLASH_SCREEN}>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.FLASH_SCREEN}
      />
      <CloseButton
        onPress={onPressBack}
        leftSource={closeIcon}
        leftTintColor={colors.WHITE}
      />
      <Touch onPressOut={onOpenCreationModal}>
        <ButtonContent>
          <ButtonTitle>{i18n.t('family.createFamily')}</ButtonTitle>
        </ButtonContent>
      </Touch>
      <Touch onPressOut={onPressJoinFamily}>
        <ButtonContent>
          <ButtonTitle>{i18n.t('family.joinFamily')}</ButtonTitle>
        </ButtonContent>
      </Touch>

      <Modal
        mt={-100}
        isOpen={showCreationModal}
        onClose={onCloseCreationModal}>
        <Modal.Content maxWidth="400px" backgroundColor={colors.WHITE}>
          <Modal.Body>
            <FormControl>
              <FormControl.Label _text={{color: colors.DARK_GRAY}}>
                {i18n.t('family.name')}
              </FormControl.Label>
              <Input
                autoFocus
                autoCorrect={false}
                autoCompleteType="off"
                color={colors.BLACK}
                borderColor={colors.SILVER}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                bgColor={colors.CONCRETE}
                _text={{color: colors.BLACK}}
                onPress={onCloseCreationModal}>
                {i18n.t('family.cancel')}
              </Button>
              <Button width={100} onPress={onCloseCreationModal}>
                {i18n.t('family.save')}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

const Touch = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonContent = styled.View`
  width: 250px;
  height: 60px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.WHITE};
`;

const ButtonTitle = styled(fonts.PrimaryFontMediumSize20)`
  color: ${colors.DARK_GRAY};
`;

const CloseButton = styled(PrimaryButton)`
  left: 15px;
  top: ${getStatusBarHeight() + 5}px;
  position: absolute;
`;

export default FamilyOptionsScreen;
