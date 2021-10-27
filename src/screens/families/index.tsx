import React, {useEffect, useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {FlatList, useDisclose} from 'native-base';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import i18n from '@locales/index';
import HorizontalFamilyItem from './shared/HorizontalFamilyItem';
import {navigate} from '@navigators/index';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {familiesSelector} from '@store/selectors/family';
import {
  createFamilyRequestAction,
  getFamiliesRequestAction,
} from '@store/actionTypes/family';
import {isNull} from '@utils/index';
import PrimaryIcon from '@components/PrimaryIcon';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PrimaryActionSheet from '@components/PrimaryActionSheet';
import FamilyCreationModal from './shared/FamilyCreationModal';
import {
  isLoadingFamiliesSelector,
  isRefreshingFamiliesSelector,
} from '@store/selectors/session';
import ImageCropPicker from 'react-native-image-crop-picker';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import PrimaryHeader from '@components/PrimaryHeader';
import {FamilyType} from '@constants/types/family';

interface Props {
  route?: any;
}

const FamiliesScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const families = useSelector(familiesSelector);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const isRefreshing = useSelector(isRefreshingFamiliesSelector);
  const isLoadingMore = useSelector(isLoadingFamiliesSelector);

  const [showTakePhotoActionSheet, setShowTakePhotoActionSheet] =
    useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [name, setName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [thumbnailBase64, setThumbnailBase64] = useState('');

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

  // Search
  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };
  const onSubmitSearchText = (text: string) => {
    if (!isNull(text)) {
      dispatch(getFamiliesRequestAction({showHUD: true, searchText: text}));
    }
  };

  // Refresh & Load more
  const onRefreshFamilies = () => {
    if (isRefreshing === false) {
      setPageIndex(0);
      dispatch(getFamiliesRequestAction({refresh: true}));
    }
  };
  const onLoadMore = () => {
    if (isLoadingMore === false && families.length >= Pagination.Family) {
      dispatch(getFamiliesRequestAction({loadMore: true, page: pageIndex + 1}));
      setPageIndex(pageIndex + 1);
    }
  };

  // List
  const renderItem = ({item}: {item: FamilyType}) => {
    return <HorizontalFamilyItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: FamilyType) => {
    navigate(ScreenName.FamilyDetailScreen, {familyDetail: item});
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

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <PrimaryHeader
        text={searchText}
        onChangeText={onChangeSearchText}
        onSubmitText={onSubmitSearchText}
        title={i18n.t('family.families')}
        onPressPlus={onOpen}
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
        ListFooterComponent={<FooterLoadingIndicator loading={isLoadingMore} />}
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

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default FamiliesScreen;
