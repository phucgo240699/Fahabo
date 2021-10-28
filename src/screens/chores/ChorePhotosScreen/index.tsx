import i18n from '@locales/index';
import colors from '@themes/colors';
import {RefreshControl, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {FlatList} from 'native-base';
import {Pagination} from '@constants/Constants';
import React, {useEffect, useState} from 'react';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {chorePhotosSelector} from '@store/selectors/chores';
import PhotoItem from '@screens/albums/AlbumDetailScreen/PhotoItem';
import {PhotoType} from '@constants/types/albums';
import {
  isLoadingChorePhotosSelector,
  isRefreshingChorePhotosSelector,
} from '@store/selectors/session';
import {isNull} from '@utils/index';
import {getChorePhotosRequestAction} from '@store/actionTypes/chores';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';

interface Props {
  route?: any;
}

const ChorePhotosScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const chorePhotos = useSelector(chorePhotosSelector);
  const isLoadingMore = useSelector(isLoadingChorePhotosSelector);
  const isRefreshing = useSelector(isRefreshingChorePhotosSelector);

  // Life Cycle
  useEffect(() => {
    if (!isNull(route.params.chore.id)) {
      dispatch(
        getChorePhotosRequestAction({
          showHUD: true,
          choreId: route.params.chore.id,
        }),
      );
    }
  }, []);

  // Refresh && Load More
  const onRefreshData = () => {
    if (!isNull(route.params.chore.id) && isRefreshing === false) {
      dispatch(
        getChorePhotosRequestAction({
          refresh: true,
          choreId: route.params.chore.id,
        }),
      );
      setPageIndex(0);
    }
  };
  const onLoadMoreData = () => {
    if (
      !isNull(route.params.chore.id) &&
      isLoadingMore === false &&
      chorePhotos.length >= Pagination.ChorePhotos
    ) {
      dispatch(
        getChorePhotosRequestAction({
          loadMore: true,
          page: pageIndex + 1,
          choreId: route.params.chore.id,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  const onPressItem = (item: PhotoType) => {};
  const renderItem = ({item}: {item: PhotoType}) => {
    return <PhotoItem item={item} onPress={onPressItem} />;
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader
        title={i18n.t('chores.photo')}
        backgroundColor={colors.WHITE}
      />
      <FlatList
        numColumns={3}
        data={chorePhotos}
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
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    flexDirection: 'column',
  },
});

export default ChorePhotosScreen;
