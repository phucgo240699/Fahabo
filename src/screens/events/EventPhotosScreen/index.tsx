import i18n from '@locales/index';
import colors from '@themes/colors';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {FlatList} from 'native-base';
import {Pagination, ScreenName} from '@constants/Constants';
import React, {useEffect, useState} from 'react';
import ProfileHeader from '@components/ProfileHeader';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {chorePhotosSelector} from '@store/selectors/chores';
import PhotoItem from '@screens/albums/AlbumDetailScreen/PhotoItem';
import {PhotoType} from '@constants/types/albums';
import {
  isLoadingChorePhotosSelector,
  isLoadingEventPhotosSelector,
  isRefreshingChorePhotosSelector,
  isRefreshingEventPhotosSelector,
} from '@store/selectors/session';
import {isNull} from '@utils/index';
import {getChorePhotosRequestAction} from '@store/actionTypes/chores';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import {eventPhotosSelector} from '@store/selectors/events';
import {getEventPhotosRequestAction} from '@store/actionTypes/events';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { navigate } from '@navigators/index';

interface Props {
  route?: any;
}

const EventPhotosScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const eventPhotos = useSelector(eventPhotosSelector);
  const isLoadingMore = useSelector(isLoadingEventPhotosSelector);
  const isRefreshing = useSelector(isRefreshingEventPhotosSelector);

  // Life Cycle
  useEffect(() => {
    if (!isNull(route.params.event.id)) {
      dispatch(
        getEventPhotosRequestAction({
          showHUD: true,
          eventId: route.params.event.id,
        }),
      );
    }
  }, []);

  // Refresh && Load More
  const onRefreshData = () => {
    if (!isNull(route.params.event.id) && isRefreshing === false) {
      dispatch(
        getChorePhotosRequestAction({
          refresh: true,
          choreId: route.params.event.id,
        }),
      );
      setPageIndex(0);
    }
  };
  const onLoadMoreData = () => {
    if (
      !isNull(route.params.event.id) &&
      isLoadingMore === false &&
      eventPhotos.length >= Pagination.EventPhotos
    ) {
      dispatch(
        getChorePhotosRequestAction({
          loadMore: true,
          page: pageIndex + 1,
          choreId: route.params.event.id,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  const onPressItem = (item: PhotoType) => {
    navigate(ScreenName.ImageViewerScreen, {
      data: eventPhotos,
      currentIndex: item.index,
    });
  };
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
        data={eventPhotos}
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
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    flexDirection: 'column',
  },
});

export default EventPhotosScreen;
