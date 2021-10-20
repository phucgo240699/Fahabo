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
import {Constants, ScreenName} from '@constants/Constants';
import PrimaryActionSheetItem from '@components/PrimaryActionSheetItem';
import {getInset} from 'react-native-safe-area-view';
import {DummyFamilies} from '@constants/DummyData';
import {useDispatch, useSelector} from 'react-redux';
import {familiesSelector} from '@store/selectors/family';
import {
  createFamilyRequestAction,
  getFamiliesRequestAction,
  getFamilyDetailRequestAction,
  getRefreshFamiliesRequestAction,
} from '@store/actionTypes/family';
import {isNull} from '@utils/index';
import {launchImageLibrary} from 'react-native-image-picker';
import PrimaryIcon from '@components/PrimaryIcon';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import {FamilyType} from '@constants/types/family';
import FamilyCreationModal from './shared/FamilyCreationModal';
import {
  isLoadingFamiliesSelector,
  isRefreshingFamiliesSelector,
} from '@store/selectors/session';
import ImageCropPicker from 'react-native-image-crop-picker';

interface Props {
  route?: any;
}

const FamiliesScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const families = useSelector(familiesSelector);
  const [pageIndex, setPageIndex] = useState(0);
  const isRefreshing = useSelector(isRefreshingFamiliesSelector);
  const isLoadingMore = useSelector(isLoadingFamiliesSelector);

  const [showTakePhotoActionSheet, setShowTakePhotoActionSheet] =
    useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [name, setName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');

  // Life Cycle
  useEffect(() => {
    dispatch(getFamiliesRequestAction({}));
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

  // Refresh & Load more
  const onRefreshFamilies = () => {
    if (isRefreshing === false) {
      dispatch(getRefreshFamiliesRequestAction());
    }
  };
  const onLoadMore = () => {
    if (isLoadingMore === false) {
      dispatch(getFamiliesRequestAction({page: pageIndex + 1}));
      setPageIndex(pageIndex + 1);
    }
  };

  // List
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalFamilyItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: any) => {
    dispatch(getFamilyDetailRequestAction({familyId: item.id}));
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
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (response.assets !== undefined && !isNull(response.assets[0]?.uri)) {
          ImageCropPicker.openCropper({
            cropping: true,
            mediaType: 'photo',
            includeBase64: true,
            path: response.assets[0]?.uri ?? '',
            width: Constants.FAMILY_THUMBNAIL_WIDTH,
            height: Constants.FAMILY_THUMBNAIL_HEIGHT,
          }).then(cropped => {
            if (!isNull(cropped.path) && !isNull(cropped.data)) {
              setThumbnailUri(cropped.path ?? '');
              setThumbnailBase64(cropped.data ?? '');
            }
          });
        }
      });
    }, 300);
  };

  return (
    <SafeView>
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
        data={families}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefreshFamilies}
          />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal Create Family */}
      <FamilyCreationModal
        isOpen={showCreationModal}
        onClose={onPressCancel}
        name={name}
        thumbnailUri={thumbnailUri}
        onChangeName={onChangeName}
        onPressThumbnail={onOpenTakePhotoActionSheet}
        onPressCancel={onPressCancel}
        onPressSave={onPressSave}
      />

      {/* Family Options ActionSheet */}
      <PrimaryActionSheet
        isOpen={isOpen}
        onClose={onClose}
        items={[
          {
            title: i18n.t('family.createFamily'),
            onPress: onPressCreateFamily,
          },
          {
            title: i18n.t('family.joinFamily'),
            onPress: onPressJoinFamily,
          },
        ]}
      />

      {/* Take photo ActionSheet */}
      <PrimaryActionSheet
        isOpen={showTakePhotoActionSheet}
        onClose={onCloseTakePhotoActionSheet}
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
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
  background-color: ${colors.WHITE};
`;

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

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },
});

export default FamiliesScreen;
