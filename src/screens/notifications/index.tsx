import React, {useEffect, useState} from 'react';
import {FlatList} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Pagination} from '@constants/Constants';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch, useSelector} from 'react-redux';
import {
  isGettingNotificationSelector,
  isLoadingMoreNotificationSelector,
  isRefreshingNotificationSelector,
  notificationsSelector,
} from '@store/selectors/notifications';
import {isNull} from '@utils/index';
import {focusFamilySelector} from '@store/selectors/family';
import {
  clickNotificationRequestAction,
  getNotificationsRequestAction,
} from '@store/actionTypes/notifications';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import HorizontalNotificationItem from './shared/HorizontalNotificationItem';
import ProfileHeader from '@components/ProfileHeader';
import {NotificationType} from '@constants/types/notifications';
import {NotificationNavigationType} from '@constants/types/modals';
import {connectTwilioRequestActions} from '@store/actionTypes/interactions';
import {getFamilyDetailRequestAction} from '@store/actionTypes/family';
import {getEventDetailRequestAction} from '@store/actionTypes/events';
import {getChoreDetailRequestAction} from '@store/actionTypes/chores';
import GettingIndicator from '@components/GettingIndicator';

interface Props {}

const NotificationsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const notifications = useSelector(notificationsSelector);
  const isGetting = useSelector(isGettingNotificationSelector);
  const isRefreshing = useSelector(isRefreshingNotificationSelector);
  const isLoadingMore = useSelector(isLoadingMoreNotificationSelector);
  const [pageIndex, setPageIndex] = useState(0);

  // Get Notifications
  useEffect(() => {
    dispatch(getNotificationsRequestAction({getting: true}));
  }, []);

  // Refresh
  const onRefreshData = () => {
    if (isRefreshing === false) {
      dispatch(getNotificationsRequestAction({refresh: true}));
    }
  };

  // Load More
  const onLoadMore = () => {
    if (
      isLoadingMore === false &&
      !isNull(focusFamily?.id) &&
      notifications.length >= Pagination.Notifications
    ) {
      dispatch(getNotificationsRequestAction({loadMore: true}));
      setPageIndex(pageIndex + 1);
    }
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalNotificationItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: NotificationType) => {
    switch (item.data?.navigate) {
      case NotificationNavigationType.CHORE_DETAIL:
        if (!isNull(item.data.id)) {
          dispatch(
            getChoreDetailRequestAction({
              choreId: item.data.id,
            }),
          );
          dispatch(clickNotificationRequestAction({id: item.id}));
        }
        break;
      case NotificationNavigationType.EVENT_DETAIL:
        if (!isNull(item.data.id)) {
          dispatch(
            getEventDetailRequestAction({
              eventId: item.data.id,
            }),
          );
          dispatch(clickNotificationRequestAction({id: item.id}));
        }
        break;
      case NotificationNavigationType.FAMILY_DETAIL:
        if (!isNull(item.data.id)) {
          dispatch(
            getFamilyDetailRequestAction({
              familyId: item.data.id,
            }),
          );
          dispatch(clickNotificationRequestAction({id: item.id}));
        }
        break;
      case NotificationNavigationType.VIDEO_CALL:
        if (!isNull(item.data.id) && !isNull(item.data.familyId)) {
          dispatch(
            connectTwilioRequestActions({
              familyId: item.data.familyId,
              roomCallId: item.data.id?.toString(), // is roomName
            }),
          );
          dispatch(clickNotificationRequestAction({id: item.id}));
        }
      default:
        break;
    }
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <ProfileHeader
        hideNavigateBack
        title={i18n.t('notification.notifications')}
      />
      {isGetting === true ? (
        <GettingIndicator />
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefreshData}
            />
          }
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <FooterLoadingIndicator loading={isLoadingMore} />
          }
        />
      )}
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
    paddingBottom: 50,
  },
});

export default NotificationsScreen;
