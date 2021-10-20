import React, {useEffect, useState} from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import {FlatList} from 'native-base';
import HorizontalMemberItem from './shared/HorizontalMemberItem';
import {useDispatch, useSelector} from 'react-redux';
import {membersInFamilySelector} from '@store/selectors/family';
import {userSelector} from '@store/selectors/authentication';
import {Pagination} from '@constants/Constants';
import {isNull} from '@utils/index';
import {MemberType} from '@constants/types/family';
import {
  isLoadingFamilyMembersSelector,
  isRefreshingFamilyMembersSelector,
} from '@store/selectors/session';
import {
  getFamilyMembersRequestAction,
  getRefreshFamilyMembersRequestAction,
} from '@store/actionTypes/family';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';

interface Props {
  route?: any;
}

const FamilyMembersScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(0);
  const isLoading = useSelector(isLoadingFamilyMembersSelector);
  const isRefreshing = useSelector(isRefreshingFamilyMembersSelector);
  const membersInFamily = useSelector(membersInFamilySelector);

  // Life Cycle
  useEffect(() => {
    dispatch(getFamilyMembersRequestAction({familyId: route.params.familyId}));
  }, []);

  // Item
  const renderItem = ({item}: {item: MemberType}) => {
    return <HorizontalMemberItem item={item} />;
  };

  // Refresh & Load More
  const onRefreshData = () => {
    if (isRefreshing === false) {
      dispatch(
        getRefreshFamilyMembersRequestAction({familyId: route.params.familyId}),
      );
    }
  };
  const onLoadMore = () => {
    if (isLoading === false) {
      dispatch(
        getFamilyMembersRequestAction({
          familyId: route.params.familyId,
          page: pageIndex + 1,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  const members = isNull(membersInFamily)
    ? []
    : membersInFamily.filter((item, index) => {
        return index < Pagination.FamilyMembers;
      });
  return (
    <SafeView>
      <ProfileHeader title={i18n.t('family.members')} />
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
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
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
