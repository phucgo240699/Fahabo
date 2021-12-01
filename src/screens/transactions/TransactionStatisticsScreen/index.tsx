import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';
import ProfileHeader from '@components/ProfileHeader';
import {PieChart} from 'react-native-chart-kit';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import i18n from '@locales/index';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {TransactionCategorySegment} from '@constants/types/transactions';
import {useDispatch, useSelector} from 'react-redux';
import {
  expenseTransactionStatisticsSelector,
  incomeTransactionStatisticsSelector,
  isGettingExpenseTransactionStatisticsSelector,
  isGettingIncomeTransactionStatisticsSelector,
} from '@store/selectors/transactions';
import {getCategorySegmentName} from '@utils/transactions';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {getTransactionStatisticsRequestAction} from '@store/actionTypes/transactions';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';
import GettingIndicator from '@components/GettingIndicator';

interface Props {
  route?: any;
}

const TransactionStatisticsScreen: React.FC<Props> = ({route}) => {
  const width = Constants.MAX_WIDTH;
  const height = 256;

  // const dispatch = useDispatch();
  // const focusFamily = useSelector(focusFamilySelector);
  const expenseTransactionStatistics = useSelector(
    expenseTransactionStatisticsSelector,
  );
  const incomeTransactionStatistics = useSelector(
    incomeTransactionStatisticsSelector,
  );
  // const isGettingExpense = useSelector(
  //   isGettingExpenseTransactionStatisticsSelector,
  // );
  // const isGettingIncome = useSelector(
  //   isGettingIncomeTransactionStatisticsSelector,
  // );

  const types = [
    TransactionCategorySegment.EXPENSE,
    TransactionCategorySegment.INCOME,
  ];
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);

  const chartConfigs = [
    {
      backgroundColor: '#000000',
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
  ];

  const chartConfig = chartConfigs[0];
  const graphStyle = {
    marginVertical: 8,
    ...chartConfigs[0].style,
  };

  // // Life Cycle
  // useEffect(() => {
  //   if (
  //     route &&
  //     route.params &&
  //     route.params.month &&
  //     route.params.year &&
  //     !isNull(focusFamily?.id)
  //   ) {
  //     dispatch(
  //       getTransactionStatisticsRequestAction({
  //         getting: true,
  //         familyId: focusFamily?.id,
  //         month: route.params.month,
  //         year: route.params.year,
  //         type: TransactionCategorySegment.EXPENSE,
  //       }),
  //     );
  //     dispatch(
  //       getTransactionStatisticsRequestAction({
  //         getting: true,
  //         familyId: focusFamily?.id,
  //         month: route.params.month,
  //         year: route.params.year,
  //         type: TransactionCategorySegment.INCOME,
  //       }),
  //     );
  //   }
  // }, []);

  // Segment control
  const onChangeSegment = (event: any) => {
    setSelectedTypeIndex(event.nativeEvent.selectedSegmentIndex);
    console.log({expenseTransactionStatistics});
    console.log({incomeTransactionStatistics});
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.WHITE}
      />
      <ProfileHeader title={i18n.t('transaction.statistic')} />
      <Container>
        <SegmentedControl
          values={types.map(item => getCategorySegmentName(item))}
          selectedIndex={selectedTypeIndex}
          onChange={onChangeSegment}
          style={styles.segmentControl}
        />
        {selectedTypeIndex === 0 ? (
          <PieChart
            data={expenseTransactionStatistics}
            height={height}
            width={width}
            chartConfig={chartConfig}
            accessor="population"
            style={graphStyle}
            backgroundColor="transparent"
            paddingLeft="15"
          />
        ) : (
          <PieChart
            data={incomeTransactionStatistics}
            height={height}
            width={width}
            chartConfig={chartConfig}
            accessor="population"
            style={graphStyle}
            backgroundColor="transparent"
            paddingLeft="15"
          />
        )}
      </Container>
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const Container = styled.ScrollView``;

const styles = StyleSheet.create({
  segmentControl: {marginTop: 10, marginBottom: 10},
});

export default TransactionStatisticsScreen;
