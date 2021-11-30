import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {FlatList} from 'native-base';
import {DummyTransactionCategories} from '@constants/DummyData';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import HorizontalTransactionCategoryItem from './shared/HorizontalTransactionCategoryItem';
import TransactionCategoriesFooter from './shared/TransactionCategoriesFooter';
import {navigate} from '@navigators/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  isGettingTransactionCategoriesSelector,
  isLoadingTransactionCategoriesSelector,
  isRefreshingTransactionCategoriesSelector,
  transactionCategoriesSelector,
} from '@store/selectors/transactions';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';
import {getTransactionCategoriesRequestAction} from '@store/actionTypes/transactions';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';

const TransactionCategoriesScreen = () => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const transactionCategories = useSelector(transactionCategoriesSelector);
  const isGetting = useSelector(isGettingTransactionCategoriesSelector);
  const isRefreshing = useSelector(isRefreshingTransactionCategoriesSelector);
  const isLoadingMore = useSelector(isLoadingTransactionCategoriesSelector);
  const [pageIndex, setPageIndex] = useState(0);
  const [type, setType] = useState('EXPENSE'); // INCOME

  // Life Cycle
  useEffect(() => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getTransactionCategoriesRequestAction({
          getting: true,
          type: type,
          familyId: focusFamily?.id,
        }),
      );
    }
  }, []);

  // Refresh & Load more
  const onRefreshData = () => {
    if (isRefreshing === false) {
      setPageIndex(0),
        dispatch(
          getTransactionCategoriesRequestAction({
            type: type,
            familyId: focusFamily?.id,
            refresh: true,
          }),
        );
    }
  };
  const onLoadMoreData = () => {
    if (
      isLoadingMore === false &&
      transactionCategories.length >= Pagination.TransactionCategories
    ) {
      dispatch(
        getTransactionCategoriesRequestAction({
          type: type,
          familyId: focusFamily?.id,
          loadMore: true,
          page: pageIndex + 1,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <HorizontalTransactionCategoryItem item={item} onPress={onPressItem} />
    );
  };
  const onPressItem = (item: any) => {
    console.log(item);
  };
  const renderSeparator = () => <HLine />;

  const onPressAdd = () => {
    navigate(ScreenName.CreateTransactionCategoryScreen);
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('transaction.category')} />
      <FlatList
        data={transactionCategories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={renderSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMoreData}
        ListFooterComponent={
          isLoadingMore ? (
            <FooterLoadingIndicator loading={isLoadingMore} />
          ) : (
            <TransactionCategoriesFooter onPress={onPressAdd} />
          )
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshData} />
        }
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const HLine = styled.View`
  height: 1px;
  opacity: 0.6;
  margin-left: 80px;
  background-color: ${colors.CONCRETE};
  width: ${Constants.MAX_WIDTH - 100}px;
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },
});

export default TransactionCategoriesScreen;
