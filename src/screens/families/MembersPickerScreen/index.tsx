import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import {FlatList} from 'native-base';
import HorizontalMemberItem from '../shared/HorizontalMemberItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  isGettingFamilyMembersSelector,
  membersInFamilySelector,
} from '@store/selectors/family';
import {Pagination, ScreenName} from '@constants/Constants';
import {MemberType} from '@constants/types/family';
import {
  isLoadingFamilyMembersSelector,
  isRefreshingFamilyMembersSelector,
} from '@store/selectors/family';
import {
  getFamilyMembersForCallRequestAction,
  getFamilyMembersRequestAction,
} from '@store/actionTypes/family';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import PrimaryButton from '@components/PrimaryButton';
import {navigate} from '@navigators/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {userSelector} from '@store/selectors/authentication';
import GettingIndicator from '@components/GettingIndicator';

interface Props {
  route?: any;
}

const MembersPickerScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const membersInFamily = useSelector(membersInFamilySelector);
  const isGetting = useSelector(isGettingFamilyMembersSelector);
  const isLoading = useSelector(isLoadingFamilyMembersSelector);
  const isRefreshing = useSelector(isRefreshingFamilyMembersSelector);

  const [pageIndex, setPageIndex] = useState(0);
  const [showMemberStatus, setShowMemberStatus] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<MemberType[]>([]);

  // Life Cycle
  useEffect(() => {
    if (route && route.params) {
      if (route.params.familyId) {
        if (route.params.fromConferenceCall) {
          dispatch(
            getFamilyMembersForCallRequestAction({
              familyId: route.params.familyId,
              getting: true,
            }),
          );
          setShowMemberStatus(true);
        } else {
          dispatch(
            getFamilyMembersRequestAction({
              familyId: route.params.familyId,
              getting: true,
            }),
          );
        }
      }
    }
  }, []);

  const members = membersInFamily.filter(item => {
    if (route && route.params && route.params.fromConferenceCall) {
      return item.id !== user?.id;
    }
    return true;
  });

  // Refresh & Load More
  const onRefreshData = () => {
    if (isRefreshing === false) {
      setPageIndex(0);
      dispatch(
        getFamilyMembersRequestAction({
          refresh: true,
          familyId: route.params.familyId,
        }),
      );
    }
  };
  const onLoadMore = () => {
    if (isLoading === false && members.length >= Pagination.FamilyMembers) {
      dispatch(
        getFamilyMembersRequestAction({
          loadMore: true,
          familyId: route.params.familyId,
          page: pageIndex + 1,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  // Item
  const renderItem = ({item}: {item: MemberType}) => {
    return (
      <HorizontalMemberItem
        pickerMode
        item={item}
        showStatus={showMemberStatus}
        onPress={onPressItem}
        isPicked={selectedMembers.map(item => item.id).includes(item.id ?? -10)}
      />
    );
  };
  const onPressItem = (item: MemberType) => {
    if (selectedMembers.map(item => item.id).indexOf(item?.id ?? -10) !== -1) {
      setSelectedMembers(
        selectedMembers.filter(e => {
          return e.id !== item?.id;
        }),
      );
    } else {
      setSelectedMembers([...selectedMembers, item]);
    }
  };

  // Submit
  const onPressSave = () => {
    if (route && route.params && route.params.fromCreateChore) {
      navigate(ScreenName.CreateChoreScreen, {
        selectedMembers: selectedMembers,
      });
    } else if (route && route.params && route.params.fromCreateEvent) {
      navigate(ScreenName.CreateEventScreen, {
        selectedMembers: selectedMembers,
      });
    } else if (route && route.params && route.params.fromConferenceCall) {
      navigate(ScreenName.InteractionsScreen, {
        selectedMembers: selectedMembers,
      });
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
        title={i18n.t('family.chooseMember')}
        rightComponent={
          selectedMembers.length > 0 ? (
            <PrimaryButton
              marginRight={8}
              title={i18n.t('chores.done')}
              titleColor={colors.THEME_COLOR_5}
              onPress={onPressSave}
            />
          ) : null
        }
      />
      {isGetting === true ? (
        <GettingIndicator />
      ) : (
        <FlatList
          data={members}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefreshData} />
          }
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.list}
          ListFooterComponent={<FooterLoadingIndicator loading={isLoading} />}
          ItemSeparatorComponent={() => <HLine />}
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

const HLine = styled.View`
  flex: 1;
  height: 1px;
  margin-left: 30px;
  margin-right: 30px;
`;

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default MembersPickerScreen;
