import React, {useEffect, useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {
  FlatList,
  Box,
  useDisclose,
  Actionsheet,
  Modal,
  FormControl,
  Input,
  Button,
} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {cameraIcon, placeholderImage, plusIcon} from '@constants/sources/index';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import ProfileHeader from '@components/ProfileHeader';
import HorizontalFamilyItem from './shared/HorizontalFamilyItem';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import PrimaryActionSheetItem from '@components/PrimaryActionSheetItem';
import {getInset} from 'react-native-safe-area-view';
import {DummyFamilies} from '@constants/DummyData';
import {useDispatch, useSelector} from 'react-redux';
import {myFamiliesSelector} from '@store/selectors/family';
import {
  createFamilyRequestAction,
  getFamiliesRequestAction,
} from '@store/actionTypes/family';
import {isNull} from '@utils/index';
import {launchImageLibrary} from 'react-native-image-picker';
import PrimaryIcon from '@components/PrimaryIcon';

interface Props {
  route?: any;
}

const FamiliesScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const bottomInset = getInset('bottom', false);
  const families = useSelector(myFamiliesSelector);

  const [showTakePhotoActionSheet, setShowTakePhotoActionSheet] =
    useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [name, setName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');

  // Life Cycle
  useEffect(() => {
    dispatch(getFamiliesRequestAction());
  }, []);

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

  // List
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalFamilyItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: any) => {
    navigate(ScreenName.QRPresenterScreen, {
      value: item.id,
      instruction: 'Scan QR code to join family',
    });
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

  // Text Input
  const onChangeName = (text: string) => {
    setName(text);
  };

  // ActionSheet Family Options
  const onPressCreateFamily = () => {
    onClose();
    onOpenCreationModal();
  };
  const onPressJoinFamily = () => {
    onClose();
    navigate(ScreenName.ScanFamilyQRScreen);
  };

  // ActionSheet Take photo
  const onOpenTakePhotoActionSheet = () => {
    setShowTakePhotoActionSheet(true);
  };
  const onCloseTakePhotoActionSheet = () => {
    setShowTakePhotoActionSheet(false);
  };
  const takePhoto = () => {
    setShowCreationModal(false);
    setShowTakePhotoActionSheet(false);
    setTimeout(() => {
      navigate(ScreenName.CameraScreen, {fromFamilies: true});
    }, 100);
  };
  const chooseFromGallery = () => {
    setShowTakePhotoActionSheet(false);
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

  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('family.families')}
        rightComponent={
          <PrimaryButton
            marginRight={8}
            leftSource={plusIcon}
            leftTintColor={colors.THEME_COLOR_6}
            onPress={onOpen}
          />
        }
      />

      <FlatList
        pt={4}
        data={families}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal Create Family */}
      <Modal mt={-100} isOpen={showCreationModal} onClose={onPressCancel}>
        <Modal.Content maxWidth="400px" backgroundColor={colors.WHITE}>
          <Modal.Body>
            <FormControl>
              <FormControl.Label _text={{color: colors.DARK_GRAY}}>
                {`${i18n.t('family.thumbnail')}:`}
              </FormControl.Label>
              <ThumbnailContainer onPress={onOpenTakePhotoActionSheet}>
                {isNull(thumbnailUri) ? (
                  <Thumbnail source={placeholderImage} />
                ) : (
                  <Thumbnail source={{uri: thumbnailUri}} />
                )}

                <CameraIcon
                  width={36}
                  height={36}
                  source={cameraIcon}
                  tintColor={'#595959'}
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
                onPress={onPressCancel}>
                {i18n.t('family.cancel')}
              </Button>
              <Button width={100} onPress={onPressSave}>
                {i18n.t('family.save')}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Family Options ActionSheet */}
      <Actionsheet
        pb={bottomInset}
        isOpen={isOpen}
        onClose={onClose}
        bgColor={colors.WHITE}>
        <PrimaryActionSheetItem
          title={i18n.t('family.createFamily')}
          onPress={onPressCreateFamily}
        />
        <HLine />
        <PrimaryActionSheetItem
          title={i18n.t('family.joinFamily')}
          onPress={onPressJoinFamily}
        />
        <HLine />
        <PrimaryActionSheetItem
          title={i18n.t('family.cancel')}
          titleColor={colors.RED_1}
          onPress={onClose}
        />
      </Actionsheet>

      {/* Take photo ActionSheet */}
      <Actionsheet
        pb={bottomInset}
        isOpen={showTakePhotoActionSheet}
        onClose={onCloseTakePhotoActionSheet}
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
          onPress={onCloseTakePhotoActionSheet}
        />
      </Actionsheet>
    </Box>
  );
};

const Label = styled(fonts.PrimaryFontBoldSize14)`
  margin-top: 20px;
`;

const ScrollView = styled.ScrollView`
  padding-left: 30px;
  padding-right: 30px;
`;

const HLine = styled.View`
  width: 80%;
  height: 1px;
  background-color: ${colors.CONCRETE};
`;

const CameraIcon = styled(PrimaryIcon)`
  border-radius: 30px;
  background-color: ${colors.SILVER};
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

export default FamiliesScreen;
