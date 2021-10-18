import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Actionsheet,
  useDisclose,
} from 'native-base';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import fonts from '@themes/fonts';
import PrimaryButton from '@components/PrimaryButton';
import {cameraIcon, closeIcon, placeholderImage} from '@constants/sources';
import {Alert, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import {getInset} from 'react-native-safe-area-view';
import {CommonActions, useNavigation} from '@react-navigation/native';
import PrimaryActionSheetItem from '@components/PrimaryActionSheetItem';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {isNull} from '@utils/index';
import PrimaryIcon from '@components/PrimaryIcon';

interface Props {
  route?: any;
}

const FamilyOptionsScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const bottomInset = getInset('bottom', false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [name, setName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');

  // Life Cycle
  useEffect(() => {
    if (
      route &&
      route.params &&
      route.params.thumbnailUri &&
      route.params.thumbnailBase64
    ) {
      if (
        !isNull(route.params.thumbnailUri) &&
        !isNull(route.params.thumbnailBase64)
      ) {
        setShowCreationModal(true);
        setThumbnailUri(route.params.thumbnailUri);
        setThumbnailBase64(route.params.thumbnailBase64);
      }
    }
  }, [route]);

  // Navigation Back
  const onPressBack = () => {
    if (route && route.params && route.params.allowNavigateBack) {
      navigation.dispatch(CommonActions.goBack());
    }
  };

  // Modal
  const onOpenCreationModal = () => {
    setShowCreationModal(true);
  };
  const onDestroyCreationModal = () => {
    setShowCreationModal(false);
    setName('');
    setThumbnailUri('');
    setThumbnailBase64('');
  };

  // Text Input
  const onChangeName = (text: string) => {
    setName(text);
  };

  // ActionSheet
  const takePhoto = () => {
    onClose();
    setShowCreationModal(false);
    setTimeout(() => {
      navigate(ScreenName.CameraScreen, {getFamilyThumbnail: true});
    }, 100);
  };
  const chooseFromGallery = () => {
    onClose();
    setTimeout(() => {
      launchImageLibrary(
        {mediaType: 'photo', includeBase64: true},
        response => {
          if (
            response.assets !== undefined &&
            !isNull(response.assets[0]?.uri) &&
            !isNull(response.assets[0]?.base64)
          ) {
            setThumbnailUri(response.assets[0]?.uri ?? '');
            setThumbnailBase64(response.assets[0]?.base64 ?? '');
          }
        },
      );
    }, 100);
  };

  // Button Create & Join
  const onCreateNewFamily = () => {
    console.log({name});
    console.log({thumbnailBase64});
    // onDestroyCreationModal();
    // setShowCreationModal(false);
    // TODO: Call api create family
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
      {route && route.params && route.params.allowNavigateBack && (
        <CloseButton
          onPress={onPressBack}
          leftSource={closeIcon}
          leftTintColor={colors.WHITE}
        />
      )}

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
        onClose={onDestroyCreationModal}>
        <Modal.Content maxWidth="400px" backgroundColor={colors.WHITE}>
          <Modal.Body>
            <FormControl>
              <FormControl.Label _text={{color: colors.DARK_GRAY}}>
                {`${i18n.t('family.thumbnail')}:`}
              </FormControl.Label>
              <ThumbnailContainer onPress={onOpen}>
                {isNull(thumbnailUri) ? (
                  <Thumbnail source={placeholderImage} />
                ) : (
                  <Thumbnail source={{uri: thumbnailUri}} />
                )}

                <CameraIcon
                  width={36}
                  height={36}
                  source={cameraIcon}
                  tintColor={colors.DARK_GRAY}
                />
              </ThumbnailContainer>
              <FormControl.Label mt={10} _text={{color: colors.DARK_GRAY}}>
                {`${i18n.t('family.name')}:`}
              </FormControl.Label>
              <Input
                value={name}
                autoCorrect={false}
                color={colors.BLACK}
                autoCompleteType="off"
                onChangeText={onChangeName}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                bgColor={colors.CONCRETE}
                _text={{color: colors.BLACK}}
                onPress={onDestroyCreationModal}>
                {i18n.t('family.cancel')}
              </Button>
              <Button width={100} onPress={onCreateNewFamily}>
                {i18n.t('family.save')}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Actionsheet
        pb={bottomInset}
        isOpen={isOpen}
        onClose={onClose}
        bgColor={colors.WHITE}>
        <PrimaryActionSheetItem
          title={i18n.t('popUp.takePhoto')}
          onPress={takePhoto}
        />
        <HLine />
        <PrimaryActionSheetItem
          title={i18n.t('popUp.chooseFromGallery')}
          onPress={chooseFromGallery}
        />
        <HLine />
        <PrimaryActionSheetItem
          title={i18n.t('popUp.cancel')}
          titleColor={colors.RED_1}
          onPress={onClose}
        />
      </Actionsheet>
    </Box>
  );
};

const Touch = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ThumbnailContainer = styled.TouchableOpacity`
  width: 320px;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

const Thumbnail = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
`;

const CameraIcon = styled(PrimaryIcon)`
  border-radius: 30px;
  background-color: ${colors.SILVER};
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

const HLine = styled.View`
  width: 80%;
  height: 1px;
  background-color: ${colors.CONCRETE};
`;

export default FamilyOptionsScreen;
