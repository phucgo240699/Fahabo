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
import {Pagination} from '@constants/Constants';
import {isNull} from '@utils/index';
import {MemberType} from '@constants/types/family';
import {
  isLoadingFamilyMembersSelector,
  isRefreshingFamilyMembersSelector,
} from '@store/selectors/family';
import {getFamilyMembersRequestAction} from '@store/actionTypes/family';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import GettingIndicator from '@components/GettingIndicator';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {
  route?: any;
}

const FamilyMembersScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const isGetting = useSelector(isGettingFamilyMembersSelector);
  const isLoading = useSelector(isLoadingFamilyMembersSelector);
  const isRefreshing = useSelector(isRefreshingFamilyMembersSelector);
  const membersInFamily = useSelector(membersInFamilySelector);

  useEffect(() => {
    if (route && route.params && route.params.familyId) {
      dispatch(
        getFamilyMembersRequestAction({
          getting: true,
          familyId: route.params.familyId,
        }),
      );
    }
  }, []);

  // Item
  const renderItem = ({item}: {item: MemberType}) => {
    return <HorizontalMemberItem detectHost item={item} />;
  };

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
    if (
      isLoading === false &&
      membersInFamily.length >= Pagination.FamilyMembers
    ) {
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

  return (
    <SafeView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <ProfileHeader title={i18n.t('family.members')} />
      {isGetting === true ? (
        <GettingIndicator />
      ) : (
        <FlatList
          data={membersInFamily}
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
  background-color: ${colors.CONCRETE};
`;

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default FamilyMembersScreen;
