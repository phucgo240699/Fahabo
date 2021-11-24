import React, {useEffect, useState} from 'react';
import {FlatList, useDisclose} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {plusIcon} from '@constants/sources';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import PrimaryButton from '@components/PrimaryButton';
import AlbumItem from './shared/AlbumItem';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {navigate} from '@navigators/index';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AlbumCreationModal from './shared/AlbumCreationModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  createAlbumRequestAction,
  deleteAlbumRequestAction,
  getAlbumsRequestAction,
  updateAlbumRequestAction,
} from '@store/actionTypes/albums';
import {albumsSelector, isGettingAlbumsSelector} from '@store/selectors/albums';
import {
  isLoadingAlbumsSelector,
  isRefreshingAlbumsSelector,
} from '@store/selectors/albums';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import {AlbumType} from '@constants/types/albums';
import GettingIndicator from '@components/GettingIndicator';

const itemHeight = (Constants.MAX_WIDTH - 36) / 2;
const itemWidth = (Constants.MAX_WIDTH - 36) / 2;

interface Props {
  route?: any;
}

const AlbumsScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const albums = useSelector(albumsSelector);
  const isGetting = useSelector(isGettingAlbumsSelector);
  const isLoadingMore = useSelector(isLoadingAlbumsSelector);
  const isRefreshing = useSelector(isRefreshingAlbumsSelector);
  const [pageIndex, setPageIndex] = useState(0);

  // Modal
  const {isOpen, onOpen, onClose} = useDisclose();
  const [updateMode, setUpdateMode] = useState(false);
  const [albumIdNeedUpdate, setAlbumIdNeedUpdate] = useState(-1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Life Cycle
  useEffect(() => {
    if (route.params.familyId) {
      dispatch(
        getAlbumsRequestAction({
          getting: true,
          familyId: route.params.familyId,
        }),
      );
    }
  }, []);

  // Refresh & Load More
  const onRefreshData = () => {
    if (route.params.familyId) {
      if (isRefreshing === false) {
        setPageIndex(0),
          dispatch(
            getAlbumsRequestAction({
              familyId: route.params.familyId,
              refresh: true,
            }),
          );
      }
    }
  };
  const onLoadMoreData = () => {
    if (route.params.familyId) {
      if (isLoadingMore === false && albums.length >= Pagination.Albums) {
        dispatch(
          getAlbumsRequestAction({
            familyId: route.params.familyId,
            loadMore: true,
            page: pageIndex + 1,
          }),
        );
        setPageIndex(pageIndex + 1);
      }
    }
  };

  // Create
  const onChangeTitle = (text: string) => {
    setTitle(text);
  };
  const onChangeDescription = (text: string) => {
    setDescription(text);
  };
  const onPressCreate = () => {
    setTitle('');
    setDescription('');
    setUpdateMode(false);
    onOpen();
  };
  const onCreateAlbum = () => {
    onClose();
    if (route.params.familyId) {
      dispatch(
        createAlbumRequestAction({
          familyId: route.params.familyId,
          title: title,
          description: description,
        }),
      );
    }
  };

  // Update
  const onPressUpdateAlbum = (item: any) => {
    setTitle(item.title);
    setDescription(item.description);
    setUpdateMode(true);
    setAlbumIdNeedUpdate(item.id);
    onOpen();
  };
  const onUpdateAlbum = () => {
    if (albumIdNeedUpdate != -1) {
      onClose();
      dispatch(
        updateAlbumRequestAction({
          albumId: albumIdNeedUpdate,
          title: title,
          description: description,
        }),
      );
    }
  };

  // Delete
  const onDeleteAlbum = (item: any) => {
    dispatch(deleteAlbumRequestAction({albumId: item.id}));
  };

  // Item
  const onPressItem = (item: any) => {
    navigate(ScreenName.AlbumDetailScreen, {album: item});
  };

  const renderItem = ({item}: {item: AlbumType}) => {
    return (
      <AlbumItem
        item={item}
        maxWidth={itemWidth}
        maxHeight={itemHeight}
        onPress={onPressItem}
        onPressUpdate={onPressUpdateAlbum}
        onPressDelete={onDeleteAlbum}
      />
    );
  };
  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('album.myAlbums')}
        rightComponent={
          <PrimaryButton
            marginRight={8}
            leftSource={plusIcon}
            leftTintColor={colors.THEME_COLOR_7}
            onPress={onPressCreate}
          />
        }
      />
      {isGetting === true ? (
        <GettingIndicator />
      ) : (
        <FlatList
          data={albums}
          numColumns={2}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={onLoadMoreData}
          ListFooterComponent={
            <FooterLoadingIndicator loading={isLoadingMore} />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshData}
            />
          }
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <AlbumCreationModal
        isOpen={isOpen}
        updateMode={updateMode}
        onClose={onClose}
        onPressCreate={onCreateAlbum}
        onPressSave={onUpdateAlbum}
        onPressCancel={onClose}
        title={title}
        description={description}
        onChangeTitle={onChangeTitle}
        onChangeDescription={onChangeDescription}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const styles = StyleSheet.create({
  list: {
    padding: 10,
    flexDirection: 'column',
    // alignItems: 'center',
  },
});

export default AlbumsScreen;
