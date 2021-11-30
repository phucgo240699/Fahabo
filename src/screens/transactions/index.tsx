import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import TransactionHeader from './shared/TransactionHeader';
import PrimaryButton from '@components/PrimaryButton';
import {getDateMinusOneMonth, getDatePlusOneMonth, isNull} from '@utils/index';
import {FlatList} from 'native-base';
import {DummyTransactions} from '@constants/DummyData';
import HorizontalTransactionItem from './shared/HorizontalTransactionItem';
import {RefreshControl, StyleSheet} from 'react-native';
import {plusIcon} from '@constants/sources';
import {navigate} from '@navigators/index';
import {Pagination, ScreenName} from '@constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  isGettingTransactionsSelector,
  isLoadingTransactionsSelector,
  isRefreshingTransactionsSelector,
  transactionsSelector,
} from '@store/selectors/transactions';
import {getTransactionsRequestAction} from '@store/actionTypes/transactions';
import {focusFamilySelector} from '@store/selectors/family';
import GettingIndicator from '@components/GettingIndicator';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';

interface Props {}

const TransactionsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const transactions = useSelector(transactionsSelector);
  const isGetting = useSelector(isGettingTransactionsSelector);
  const isRefreshing = useSelector(isRefreshingTransactionsSelector);
  const isLoadingMore = useSelector(isLoadingTransactionsSelector);

  const [pageIndex, setPageIndex] = useState(0);
  const [today, setToday] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const lastDate = getDateMinusOneMonth(currentDate);
  const nextDate = getDatePlusOneMonth(currentDate);

  // Life cycle
  useEffect(() => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getTransactionsRequestAction({
          getting: true,
          familyId: focusFamily?.id,
        }),
      );
    }
  }, []);

  // Refresh && Load more
  const onRefreshData = () => {
    if (isRefreshing === false) {
      setPageIndex(0),
        dispatch(
          getTransactionsRequestAction({
            familyId: focusFamily?.id,
            refresh: true,
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
          familyId: focusFamily?.id,
          loadMore: true,
          page: pageIndex + 1,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  // Switch Months
  const onPressLastMonth = () => {
    setCurrentDate(getDateMinusOneMonth(currentDate));
  };
  const onPressNextMonth = () => {
    setCurrentDate(getDatePlusOneMonth(currentDate));
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return <HorizontalTransactionItem item={item} />;
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
        <FlatList
          mt={2}
          data={transactions}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          keyExtractor={(item, index) => index.toString()}
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
