import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Box, FlatList} from 'native-base';
import {Constants, Pagination, ScreenName} from '@constants/Constants';
import HorizontalTransactionCategoryItem from './shared/HorizontalTransactionCategoryItem';
import TransactionCategoriesFooter from './shared/TransactionCategoriesFooter';
import {navigate} from '@navigators/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  isGettingTransactionExpenseCategoriesSelector,
  isGettingTransactionIncomeCategoriesSelector,
  isLoadingTransactionExpenseCategoriesSelector,
  isLoadingTransactionIncomeCategoriesSelector,
  isRefreshingTransactionExpenseCategoriesSelector,
  isRefreshingTransactionIncomeCategoriesSelector,
  transactionExpenseCategoriesSelector,
  transactionIncomeCategoriesSelector,
} from '@store/selectors/transactions';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';
import {
  deleteTransactionCategoryRequestAction,
  getTransactionCategoriesRequestAction,
} from '@store/actionTypes/transactions';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {getCategorySegmentName} from '@utils/transactions';
import {
  TransactionCategorySegment,
  TransactionCategoryType,
} from '@constants/types/transactions';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import PrimaryButton from '@components/PrimaryButton';
import {trashIcon} from '@constants/sources';
import GettingIndicator from '@components/GettingIndicator';

const TransactionCategoriesScreen = () => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const transactionExpenseCategories = useSelector(
    transactionExpenseCategoriesSelector,
  );
  const transactionIncomeCategories = useSelector(
    transactionIncomeCategoriesSelector,
  );
  const isGettingExpense = useSelector(
    isGettingTransactionExpenseCategoriesSelector,
  );
  const isRefreshingExpense = useSelector(
    isRefreshingTransactionExpenseCategoriesSelector,
  );
  const isLoadingMoreExpense = useSelector(
    isLoadingTransactionExpenseCategoriesSelector,
  );
  const isGettingIncome = useSelector(
    isGettingTransactionIncomeCategoriesSelector,
  );
  const isRefreshingIncome = useSelector(
    isRefreshingTransactionIncomeCategoriesSelector,
  );
  const isLoadingMoreIncome = useSelector(
    isLoadingTransactionIncomeCategoriesSelector,
  );
  const [expensePageIndex, setExpensePageIndex] = useState(0);
  const [incomePageIndex, setIncomePageIndex] = useState(0);
  // const [pageIndex, setPageIndex] = useState(0);
  const [expenseIndexSwiped, setExpenseIndexSwiped] = useState<
    string | undefined
  >(undefined);
  const [incomeIndexSwiped, setIncomeIndexSwiped] = useState<
    string | undefined
  >(undefined);
  const types = [
    TransactionCategorySegment.EXPENSE,
    TransactionCategorySegment.INCOME,
  ];
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

  // // Life Cycle
  // useEffect(() => {
  //   if (!isNull(focusFamily?.id)) {
  //     dispatch(
  //       getTransactionCategoriesRequestAction({
  //         getting: true,
  //         type: types[0],
  //         familyId: focusFamily?.id,
  //       }),
  //     );
  //     dispatch(
  //       getTransactionCategoriesRequestAction({
  //         getting: true,
  //         type: types[1],
  //         familyId: focusFamily?.id,
  //       }),
  //     );
  //   }
  // }, []);

  // Refresh
  const onRefreshExpense = () => {
    if (isRefreshingExpense === false) {
      setExpensePageIndex(0),
        dispatch(
          getTransactionCategoriesRequestAction({
            type: types[0],
            familyId: focusFamily?.id,
            refresh: true,
          }),
        );
    }
  };
  const onRefreshIncome = () => {
    if (isRefreshingIncome === false) {
      setIncomePageIndex(0),
        dispatch(
          getTransactionCategoriesRequestAction({
            type: types[1],
            familyId: focusFamily?.id,
            refresh: true,
          }),
        );
    }
  };

  // Load More
  const onLoadMoreExpense = () => {
    if (
      isLoadingMoreExpense === false &&
      transactionExpenseCategories.length >= Pagination.TransactionCategories
    ) {
      dispatch(
        getTransactionCategoriesRequestAction({
          type: types[selectedTypeIndex],
          familyId: focusFamily?.id,
          loadMore: true,
          page: expensePageIndex + 1,
        }),
      );
      setExpensePageIndex(expensePageIndex + 1);
    }
  };
  const onLoadMoreIncome = () => {
    if (
      isLoadingMoreIncome === false &&
      transactionIncomeCategories.length >= Pagination.TransactionCategories
    ) {
      dispatch(
        getTransactionCategoriesRequestAction({
          type: types[selectedTypeIndex],
          familyId: focusFamily?.id,
          loadMore: true,
          page: incomePageIndex + 1,
        }),
      );
      setIncomePageIndex(incomePageIndex + 1);
    }
  };

  // Segment control
  const onChangeSegment = (event: any) => {
    setSelectedTypeIndex(event.nativeEvent.selectedSegmentIndex);
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return (
      <HorizontalTransactionCategoryItem item={item} onPress={onPressItem} />
    );
  };
  const onPressItem = (item: TransactionCategoryType) => {
    navigate(ScreenName.CreateTransactionScreen, {selectedCategory: item});
  };
  const renderSeparator = () => <HLine />;

  const closeSwipedRow = (rowKey: string, rowMap: RowMap<any>) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const onPressDeleteExpense = (rowKey: string, rowMap: RowMap<any>) => {
    if (expenseIndexSwiped) {
      closeSwipedRow(rowKey, rowMap);
      for (let i = 0; i < transactionExpenseCategories.length; ++i) {
        if (i.toString() === expenseIndexSwiped) {
          dispatch(
            deleteTransactionCategoryRequestAction({
              categoryId: transactionExpenseCategories[i].id,
              type: transactionExpenseCategories[i].type,
            }),
          );
          return;
        }
      }
    }
  };
  const onPressDeleteIncome = (rowKey: string, rowMap: RowMap<any>) => {
    if (incomeIndexSwiped) {
      closeSwipedRow(rowKey, rowMap);
      for (let i = 0; i < transactionIncomeCategories.length; ++i) {
        if (i.toString() === incomeIndexSwiped) {
          dispatch(
            deleteTransactionCategoryRequestAction({
              categoryId: transactionExpenseCategories[i].id,
              type: transactionExpenseCategories[i].type,
            }),
          );
          return;
        }
      }
    }
  };

  const onExpenseDidSwipe = (
    rowKey: string,
    rowMap: RowMap<any>,
    toValue: number,
  ) => {
    setExpenseIndexSwiped(rowKey);
  };

  const onIncomeDidSwipe = (
    rowKey: string,
    rowMap: RowMap<any>,
    toValue: number,
  ) => {
    setExpenseIndexSwiped(rowKey);
  };

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
      <SegmentedControl
        values={types.map(item => getCategorySegmentName(item))}
        selectedIndex={selectedTypeIndex}
        onChange={onChangeSegment}
        style={styles.segmentControl}
      />
      {selectedTypeIndex === 0 ? (
        isGettingExpense ? (
          <GettingIndicator />
        ) : (
          <SwipeListView
            data={transactionExpenseCategories}
            renderItem={renderItem}
            disableRightSwipe={true}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderSeparator}
            onEndReachedThreshold={0.5}
            onEndReached={onLoadMoreExpense}
            ListFooterComponent={
              isLoadingMoreExpense ? (
                <FooterLoadingIndicator loading={isLoadingMoreExpense} />
              ) : (
                <TransactionCategoriesFooter onPress={onPressAdd} />
              )
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshingExpense}
                onRefresh={onRefreshExpense}
              />
            }
            renderHiddenItem={(data, rowMap) => (
              <Box
                height={'100%'}
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                backgroundColor={colors.WHITE}>
                <SwipeDeleteButton
                  leftSource={trashIcon}
                  leftTintColor={'#ffffff'}
                  onPress={() =>
                    onPressDeleteExpense(data.index.toString(), rowMap)
                  }
                />
              </Box>
            )}
            leftOpenValue={80}
            rightOpenValue={-80}
            onRowOpen={onExpenseDidSwipe}
          />
        )
      ) : isGettingIncome ? (
        <GettingIndicator />
      ) : (
        <SwipeListView
          data={transactionIncomeCategories}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={renderSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={onLoadMoreIncome}
          ListFooterComponent={
            isLoadingMoreIncome ? (
              <FooterLoadingIndicator loading={isLoadingMoreIncome} />
            ) : (
              <TransactionCategoriesFooter onPress={onPressAdd} />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshingIncome}
              onRefresh={onRefreshIncome}
            />
          }
          renderHiddenItem={(data, rowMap) => (
            <Box
              height={'100%'}
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              backgroundColor={colors.WHITE}>
              <SwipeDeleteButton
                leftSource={trashIcon}
                leftTintColor={'#ffffff'}
                onPress={() =>
                  onPressDeleteIncome(data.index.toString(), rowMap)
                }
              />
            </Box>
          )}
          leftOpenValue={80}
          rightOpenValue={-80}
          onRowOpen={onIncomeDidSwipe}
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

const SwipeDeleteButton = styled(PrimaryButton)`
  width: 80px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: #ff4000;
`;

const HLine = styled.View`
  height: 1px;
  opacity: 0.6;
  margin-left: 80px;
  background-color: ${colors.CONCRETE};
  width: ${Constants.MAX_WIDTH - 100}px;
`;

const styles = StyleSheet.create({
  segmentControl: {marginTop: 10, marginBottom: 10},
});

export default TransactionCategoriesScreen;
