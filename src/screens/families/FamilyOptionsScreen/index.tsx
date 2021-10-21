import React, {useEffect, useState} from 'react';
import {Box, useDisclose} from 'native-base';
import colors from '@themes/colors';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import i18n from '@locales/index';
import styled from 'styled-components/native';
import fonts from '@themes/fonts';
import PrimaryButton from '@components/PrimaryButton';
import {closeIcon} from '@constants/sources';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';
import {Constants, ScreenName} from '@constants/Constants';
import {getInset} from 'react-native-safe-area-view';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {isNull} from '@utils/index';
import PrimaryIcon from '@components/PrimaryIcon';
import {createFamilyRequestAction} from '@store/actionTypes/family';
import {useDispatch} from 'react-redux';
import FamilyCreationModal from '../shared/FamilyCreationModal';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import ImageCropPicker from 'react-native-image-crop-picker';

interface Props {
  route?: any;
}

const FamilyOptionsScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bottomInset = getInset('bottom', false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [name, setName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');

  // Life Cycle
  useEffect(() => {
    if (route && route.params) {
      if (
        !isNull(route.params.thumbnailUri) &&
        !isNull(route.params.thumbnailBase64)
      ) {
        setThumbnailUri(route.params.thumbnailUri);
        setThumbnailBase64(route.params.thumbnailBase64);
      }
      if (route.params.showCreationModal === true) {
        setShowCreationModal(true);
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
  const onPressCancel = () => {
    setName('');
    setThumbnailUri('');
    setThumbnailBase64('');
    setShowCreationModal(false);
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
      navigate(ScreenName.CameraScreen, {fromFamilyOptions: true});
    }, 100);
  };
  const chooseFromGallery = () => {
    onClose();
    ImageCropPicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      width: Constants.FAMILY_THUMBNAIL_WIDTH,
      height: Constants.FAMILY_THUMBNAIL_HEIGHT,
    }).then(cropped => {
      if (!isNull(cropped.path) && !isNull(cropped.data)) {
        setThumbnailUri(cropped.path ?? '');
        setThumbnailBase64(cropped.data ?? '');
      }
    });
  };

  // Button Create & Join
  const onPressSave = () => {
    onPressCancel();

    setTimeout(() => {
      dispatch(
        createFamilyRequestAction({
          familyName: name,
          thumbnail: {name: 'familyThumbnail', base64Data: thumbnailBase64},
        }),
      );
    }, 100);
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

      <FamilyCreationModal
        isOpen={showCreationModal}
        onClose={onPressCancel}
        name={name}
        thumbnailUri={thumbnailUri}
        onChangeName={onChangeName}
        onPressThumbnail={onOpen}
        onPressCancel={onPressCancel}
        onPressSave={onPressSave}
      />

      <PrimaryActionSheet
        isOpen={isOpen}
        onClose={onClose}
        items={[
          {
            title: i18n.t('popUp.takePhoto'),
            onPress: takePhoto,
          },
          {
            title: i18n.t('popUp.chooseFromGallery'),
            onPress: chooseFromGallery,
          },
        ]}
      />
    </Box>
  );
};

const Touch = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ThumbnailContainer = styled.TouchableOpacity`
  width: ${Constants.MAX_WIDTH - 80}px;
  height: ${10 * ((Constants.MAX_WIDTH - 80) / 16)}px;
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
