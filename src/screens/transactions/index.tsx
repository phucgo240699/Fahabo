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
  transactionsSelector,
} from '@store/selectors/transactions';
import {
  deleteTransactionRequestAction,
  getTransactionDetailRequestAction,
  getTransactionsRequestAction,
} from '@store/actionTypes/transactions';
import {focusFamilySelector} from '@store/selectors/family';
import GettingIndicator from '@components/GettingIndicator';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {TransactionType} from '@constants/types/transactions';

interface Props {}

const TransactionsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const transactions = useSelector(transactionsSelector);
  const isGetting = useSelector(isGettingTransactionsSelector);
  const isRefreshing = useSelector(isRefreshingTransactionsSelector);
  const isLoadingMore = useSelector(isLoadingTransactionsSelector);

  const [pageIndex, setPageIndex] = useState(0);
  const [indexSwiped, setIndexSwiped] = useState<string | undefined>(undefined);
  const [today, setToday] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const lastDate = getDateMinusOneMonth(currentDate);
  const nextDate = getDatePlusOneMonth(currentDate);

  // // Life cycle
  // useEffect(() => {
  //   if (!isNull(focusFamily?.id)) {
  //     dispatch(
  //       getTransactionsRequestAction({
  //         getting: true,
  //         familyId: focusFamily?.id,
  //         from: `${getOriginDateStringWithMinimumDate(currentDate)} 00:00:00`,
  //         to: `${getOriginDateStringWithMaximumDate(currentDate)} 23:59:59`,
  //       }),
  //     );
  //   }
  // }, []);

  // Refresh && Load more
  const onRefreshData = () => {
    if (isRefreshing === false) {
      setPageIndex(0),
        dispatch(
          getTransactionsRequestAction({
            refresh: true,
            familyId: focusFamily?.id,
            from: `${getOriginDateStringWithMinimumDate(currentDate)} 00:00:00`,
            to: `${getOriginDateStringWithMaximumDate(currentDate)} 23:59:59`,
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
      dispatch(
        getTransactionsRequestAction({
          getting: true,
          familyId: focusFamily?.id,
          from: `${getOriginDateStringWithMinimumDate(
            getDateMinusOneMonth(currentDate),
          )} 00:00:00`,
          to: `${getOriginDateStringWithMaximumDate(
            getDateMinusOneMonth(currentDate),
          )} 23:59:59`,
        }),
      );
    }
    setCurrentDate(getDateMinusOneMonth(currentDate));
  };
  const onPressNextMonth = () => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getTransactionsRequestAction({
          getting: true,
          familyId: focusFamily?.id,
          from: `${getOriginDateStringWithMinimumDate(
            getDatePlusOneMonth(currentDate),
          )} 00:00:00`,
          to: `${getOriginDateStringWithMaximumDate(
            getDatePlusOneMonth(currentDate),
          )} 23:59:59`,
        }),
      );
    }
    setCurrentDate(getDatePlusOneMonth(currentDate));
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
  const onPressDelete = () => {
    if (indexSwiped) {
      for (let i = 0; i < transactions.length; ++i) {
        if (i.toString() === indexSwiped) {
          dispatch(
            deleteTransactionRequestAction({transactionId: transactions[i].id}),
          );
          return;
        }
      }
    }
  };
  const onPressUpdate = () => {
    if (indexSwiped) {
      for (let i = 0; i < transactions.length; ++i) {
        if (i.toString() === indexSwiped) {
          navigate(ScreenName.CreateTransactionScreen, {
            oldTransaction: transactions[i],
          });
          // console.log(transactions[i]);
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

  return (
    <Container>
      <TabView>
        <MonthButton
          title={`${lastDate.getMonth() + 1}/${getDateMinusOneMonth(
            currentDate,
          ).getFullYear()}`}
          titleFontSize={14}
          titleFontWeight={600}
          titleColor={colors.SILVER}
          onPress={onPressLastMonth}
        />
        <MonthButton
          title={`${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}
          titleFontSize={14}
          titleFontWeight={600}
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
            titleFontWeight={600}
            titleColor={colors.SILVER}
            onPress={onPressNextMonth}
          />
        )}
      </TabView>
      <TransactionHeader />

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
                onPress={onPressUpdate}
                leftTintColor={'#ffffff'}
                leftSource={editProfileIcon}
              />
              <SwipeDeleteButton
                leftSource={trashIcon}
                leftTintColor={'#ffffff'}
                onPress={onPressDelete}
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
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
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
