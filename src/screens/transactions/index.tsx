import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import TransactionHeader from './shared/TransactionHeader';
import PrimaryButton from '@components/PrimaryButton';
import {
  getDateMinusOneMonth,
  getDatePlusOneMonth,
  getOriginDateStringWithMaximumDate,
  getOriginDateStringWithMinimumDate,
  isNull,
} from '@utils/index';
import {Box, FlatList} from 'native-base';
import HorizontalTransactionItem from './shared/HorizontalTransactionItem';
import {RefreshControl, StyleSheet} from 'react-native';
import {editProfileIcon, plusIcon, trashIcon} from '@constants/sources';
import {navigate} from '@navigators/index';
import {Pagination, ScreenName} from '@constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  isGettingTransactionsSelector,
  isLoadingTransactionsSelector,
  isRefreshingTransactionsSelector,
  totalExpenseSelector,
  totalIncomeSelector,
  transactionsSelector,
} from '@store/selectors/transactions';
import {
  deleteTransactionRequestAction,
  getTransactionDetailRequestAction,
  getTransactionsRequestAction,
  getTransactionStatisticsRequestAction,
} from '@store/actionTypes/transactions';
import {focusFamilySelector} from '@store/selectors/family';
import GettingIndicator from '@components/GettingIndicator';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {
  TransactionCategorySegment,
  TransactionType,
} from '@constants/types/transactions';

interface Props {}

const TransactionsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const transactions = useSelector(transactionsSelector);
  const totalExpense = useSelector(totalExpenseSelector);
  const totalIncome = useSelector(totalIncomeSelector);
  const isGetting = useSelector(isGettingTransactionsSelector);
  const isRefreshing = useSelector(isRefreshingTransactionsSelector);
  const isLoadingMore = useSelector(isLoadingTransactionsSelector);

  const [pageIndex, setPageIndex] = useState(0);
  const [indexSwiped, setIndexSwiped] = useState<string | undefined>(undefined);
  const [today, setToday] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(today);

  // Life cycle
  useEffect(() => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getTransactionStatisticsRequestAction({
          // showHUD: true,
          familyId: focusFamily?.id,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          type: TransactionCategorySegment.EXPENSE,
        }),
      );
      dispatch(
        getTransactionStatisticsRequestAction({
          // showHUD: true,
          familyId: focusFamily?.id,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          type: TransactionCategorySegment.INCOME,
        }),
      );
    }
  }, []);

  // Refresh && Load more
  const onRefreshData = () => {
    if (isRefreshing === false && !isNull(focusFamily?.id)) {
      setPageIndex(0);
      const newDate = new Date();
      setCurrentDate(newDate);
      setToday(newDate);

      dispatch(
        getTransactionsRequestAction({
          refresh: true,
          familyId: focusFamily?.id,
          from: `${getOriginDateStringWithMinimumDate(currentDate)} 00:00:00`,
          to: `${getOriginDateStringWithMaximumDate(currentDate)} 23:59:59`,
        }),
      );
      dispatch(
        getTransactionStatisticsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          type: TransactionCategorySegment.EXPENSE,
        }),
      );
      dispatch(
        getTransactionStatisticsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          type: TransactionCategorySegment.INCOME,
        }),
      );
    }
  };
  const onLoadMoreData = () => {
    if (
      isLoadingMore === false &&
      transactions.length >= Pagination.Transactions
    ) {
      dispatch(
        getTransactionsRequestAction({
          loadMore: true,
          page: pageIndex + 1,
          familyId: focusFamily?.id,
          from: `${getOriginDateStringWithMinimumDate(currentDate)} 00:00:00`,
          to: `${getOriginDateStringWithMaximumDate(currentDate)} 23:59:59`,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  // Switch Months
  const onPressLastMonth = () => {
    if (!isNull(focusFamily?.id)) {
      const _currentDateMinusOneMonth = getDateMinusOneMonth(currentDate);
      dispatch(
        getTransactionsRequestAction({
          getting: true,
          familyId: focusFamily?.id,
          from: `${getOriginDateStringWithMinimumDate(
            _currentDateMinusOneMonth,
          )} 00:00:00`,
          to: `${getOriginDateStringWithMaximumDate(
            _currentDateMinusOneMonth,
          )} 23:59:59`,
        }),
      );

      // adapt total
      dispatch(
        getTransactionStatisticsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          month: _currentDateMinusOneMonth.getMonth() + 1,
          year: _currentDateMinusOneMonth.getFullYear(),
          type: TransactionCategorySegment.EXPENSE,
        }),
      );
      dispatch(
        getTransactionStatisticsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          month: _currentDateMinusOneMonth.getMonth() + 1,
          year: _currentDateMinusOneMonth.getFullYear(),
          type: TransactionCategorySegment.INCOME,
        }),
      );
      setCurrentDate(_currentDateMinusOneMonth);
    }
  };
  const onPressNextMonth = () => {
    if (!isNull(focusFamily?.id)) {
      const _currentDatePlusOneMonth = getDatePlusOneMonth(currentDate);
      dispatch(
        getTransactionsRequestAction({
          getting: true,
          familyId: focusFamily?.id,
          from: `${getOriginDateStringWithMinimumDate(
            _currentDatePlusOneMonth,
          )} 00:00:00`,
          to: `${getOriginDateStringWithMaximumDate(
            _currentDatePlusOneMonth,
          )} 23:59:59`,
        }),
      );

      // adapt total
      dispatch(
        getTransactionStatisticsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          month: _currentDatePlusOneMonth.getMonth() + 1,
          year: _currentDatePlusOneMonth.getFullYear(),
          type: TransactionCategorySegment.EXPENSE,
        }),
      );
      dispatch(
        getTransactionStatisticsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          month: _currentDatePlusOneMonth.getMonth() + 1,
          year: _currentDatePlusOneMonth.getFullYear(),
          type: TransactionCategorySegment.INCOME,
        }),
      );
      setCurrentDate(_currentDatePlusOneMonth);
    }
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalTransactionItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: TransactionType) => {
    if (!isNull(item.id)) {
      dispatch(
        getTransactionDetailRequestAction({
          transactionId: item.id,
        }),
      );
    }
  };
  const closeSwipedRow = (rowKey: string, rowMap: RowMap<any>) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const onPressDelete = (rowKey: string, rowMap: RowMap<any>) => {
    if (indexSwiped) {
      closeSwipedRow(rowKey, rowMap);
      for (let i = 0; i < transactions.length; ++i) {
        if (i.toString() === indexSwiped) {
          dispatch(
            deleteTransactionRequestAction({
              transactionId: transactions[i].id,
              month: currentDate.getMonth() + 1,
              year: currentDate.getFullYear(),
            }),
          );
          return;
        }
      }
    }
  };
  const onPressUpdate = (rowKey: string, rowMap: RowMap<any>) => {
    if (indexSwiped) {
      closeSwipedRow(rowKey, rowMap);
      for (let i = 0; i < transactions.length; ++i) {
        if (i.toString() === indexSwiped) {
          navigate(ScreenName.CreateTransactionScreen, {
            oldTransaction: transactions[i],
          });
          return;
        }
      }
    }
  };
  const onDidSwipe = (rowKey: string, rowMap: RowMap<any>, toValue: number) => {
    setIndexSwiped(rowKey);
  };

  // Creation
  const onPressCreateButton = () => {
    navigate(ScreenName.CreateTransactionScreen);
  };

  // Header
  const onViewStatistic = () => {
    navigate(ScreenName.TransactionStatisticsScreen);
  };

  const lastDate = getDateMinusOneMonth(currentDate);
  const nextDate = getDatePlusOneMonth(currentDate);
  return (
    <Container>
      <TabView>
        <MonthButton
          title={`${lastDate.getMonth() + 1}/${getDateMinusOneMonth(
            currentDate,
          ).getFullYear()}`}
          titleFontSize={14}
          titleFontWeight={500}
          titleColor={colors.SILVER}
          onPress={onPressLastMonth}
        />
        <MonthButton
          title={`${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}
          titleFontSize={14}
          titleFontWeight={700}
          titleColor={colors.BLACK}
        />
        {nextDate > today ? (
          <EmptyView />
        ) : (
          <MonthButton
            title={`${nextDate.getMonth() + 1}/${getDatePlusOneMonth(
              currentDate,
            ).getFullYear()}`}
            titleFontSize={14}
            titleFontWeight={500}
            titleColor={colors.SILVER}
            onPress={onPressNextMonth}
          />
        )}
      </TabView>
      <TransactionHeader
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        onPress={onViewStatistic}
      />

      {isGetting ? (
        <GettingIndicator />
      ) : (
        <SwipeListView
          data={transactions}
          renderItem={renderItem}
          disableRightSwipe={true}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => index.toString()}
          renderHiddenItem={(data, rowMap) => (
            <Box
              mt={2}
              mr={31}
              height={'100%'}
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              backgroundColor={colors.WHITE}>
              <SwipeUpdateButton
                onPress={() => onPressUpdate(data.index.toString(), rowMap)}
                leftTintColor={'#ffffff'}
                leftSource={editProfileIcon}
              />
              <SwipeDeleteButton
                leftSource={trashIcon}
                leftTintColor={'#ffffff'}
                onPress={() => onPressDelete(data.index.toString(), rowMap)}
              />
            </Box>
          )}
          leftOpenValue={150}
          rightOpenValue={-150}
          onRowOpen={onDidSwipe}
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
        />
      )}

      <CreateButton
        padding={14}
        leftSource={plusIcon}
        leftTintColor={colors.WHITE}
        onPress={onPressCreateButton}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const TabView = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const MonthButton = styled(PrimaryButton)`
  width: 100px;
  height: 30px;
  margin-top: 10px;
`;

const EmptyView = styled.View`
  width: 100px;
  height: 30px;
  margin-top: 10px;
`;

const SwipeDeleteButton = styled(PrimaryButton)`
  width: 80px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: #ff4000;
`;

const SwipeUpdateButton = styled(PrimaryButton)`
  width: 80px;
  height: 56px;
  align-items: center;
  justify-content: center;
  background-color: #134db9;
`;

const CreateButton = styled(PrimaryButton)`
  right: 14px;
  bottom: 14px;
  position: absolute;
  border-radius: 40px;
  background-color: ${colors.GREEN_1};
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },
});

export default TransactionsScreen;
