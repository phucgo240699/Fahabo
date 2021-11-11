import React, {useEffect, useState} from 'react';
import {Box, FlatList} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import styled from 'styled-components/native';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {plusIcon, trashIcon} from '@constants/sources';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import PhotoItem from './PhotoItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  isLoadingPhotosSelector,
  isRefreshingPhotosSelector,
} from '@store/selectors/session';
import {
  addPhotosRequestAction,
  deletePhotosRequestAction,
  getPhotosRequestAction,
} from '@store/actionTypes/albums';
import {isNull} from '@utils/index';
import {navigate} from '@navigators/index';
import {AlbumType, PhotoType} from '@constants/types/albums';
import ImageCropPicker from 'react-native-image-crop-picker';
import {photosSelector} from '@store/selectors/albums';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';

interface Props {
  route?: any;
}

const AlbumDetailScreen: React.FC<Props> = ({route}) => {
  const album: AlbumType = route.params.album;
  const dispatch = useDispatch();
  const photos = useSelector(photosSelector);
  const isLoadingMore = useSelector(isLoadingPhotosSelector);
  const isRefreshing = useSelector(isRefreshingPhotosSelector);
  const [isChoosing, setIsChoosing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  // Life Cycle
  useEffect(() => {
    if (!isNull(album.id)) {
      dispatch(getPhotosRequestAction({albumId: album.id}));
    }
  }, []);

  // Refresh && Load More
  const onRefreshData = () => {
    if (isRefreshing === false) {
      dispatch(getPhotosRequestAction({refresh: true, albumId: album.id}));
      setPageIndex(0);
    }
  };
  const onLoadMoreData = () => {
    if (isLoadingMore === false && photos.length >= Pagination.Photos) {
      dispatch(
        getPhotosRequestAction({
          loadMore: true,
          albumId: album.id,
          page: pageIndex + 1,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  // Header
  const onPressAdd = () => {
    ImageCropPicker.openPicker({
      maxFiles: Constants.LIMIT_PHOTO_UPLOAD,
      multiple: true,
      mediaType: 'photo',
      includeBase64: true,
    }).then(cropped => {
      if (cropped.length > Constants.LIMIT_PHOTO_UPLOAD) {
        dispatch(
          showToastAction(
            `${i18n.t('warningMessage.limitPhotoUpload')} :${
              Constants.LIMIT_PHOTO_UPLOAD
            }`,
            ToastType.WARNING,
          ),
        );
      } else {
        dispatch(
          addPhotosRequestAction({
            albumId: album.id,
            photos: cropped.map(item => {
              return {
                name: 'photo',
                base64Data: item.data ?? '',
              };
            }),
          }),
        );
      }
    });
  };
  const onToggleChoosing = () => {
    setSelectedIds([]);
    setIsChoosing(!isChoosing);
  };
  const onPressDelete = () => {
    dispatch(
      deletePhotosRequestAction({albumId: album.id, photoIds: selectedIds}),
    );
    onToggleChoosing();
  };

  // Item
  const renderItem = ({item}: {item: PhotoType}) => {
    return (
      <PhotoItem
        item={item}
        isSelected={selectedIds.indexOf(item.id ?? -10) !== -1}
        onPress={onPressItem}
      />
    );
  };
  const onPressItem = (item: PhotoType) => {
    if (isChoosing) {
      if (selectedIds.indexOf(item.id ?? -10) !== -1) {
        setSelectedIds(
          selectedIds.filter(id => {
            return id !== item.id;
          }),
        );
      } else {
        setSelectedIds([...selectedIds, item.id ?? -10]);
      }
    } else {
      navigate(ScreenName.ImageViewerScreen, {
        data: photos,
        currentIndex: item.index,
      });
    }
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={album.index === 0 ? i18n.t('album.general') : album.title}
        rightComponent={
          <Box flexDirection={'row'}>
            <ChooseButton
              marginRight={4}
              titleFontSize={16}
              titleFontWeight={500}
              title={
                isChoosing
                  ? `${i18n.t('album.cancel')}`
                  : i18n.t('album.choose')
              }
              titleColor={isChoosing ? colors.RED_1 : colors.DANUBE}
              onPress={onToggleChoosing}
            />
            <PrimaryButton
              marginRight={8}
              leftSource={plusIcon}
              leftTintColor={colors.THEME_COLOR_7}
              onPress={onPressAdd}
            />
          </Box>
        }
      />
      <FlatList
        numColumns={3}
        data={photos}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMoreData}
        ListFooterComponent={<FooterLoadingIndicator loading={isLoadingMore} />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshData} />
        }
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      {isChoosing && selectedIds.length > 0 && (
        <DeleteButtonContainer>
          <PrimaryButton
            leftSource={trashIcon}
            leftTintColor={colors.RED_1}
            onPress={onPressDelete}
          />
        </DeleteButtonContainer>
      )}
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const ChooseButton = styled(PrimaryButton)``;

const DeleteButtonContainer = styled.View`
  right: 16px;
  bottom: 16px;
  width: 48px;
  height: 48px;
  position: absolute;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.CONCRETE};
`;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    flexDirection: 'column',
  },
});

export default AlbumDetailScreen;
