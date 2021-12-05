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
import {useSelector} from 'react-redux';
import {
  expenseTransactionStatisticsSelector,
  incomeTransactionStatisticsSelector,
} from '@store/selectors/transactions';
import {getCategorySegmentName} from '@utils/transactions';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {ScrollView} from 'native-base';

interface Props {
  route?: any;
}

const TransactionStatisticsScreen: React.FC<Props> = ({route}) => {
  const width = Constants.MAX_WIDTH - 5;
  const height = 256;

  const expenseTransactionStatistics = useSelector(
    expenseTransactionStatisticsSelector,
  );
  const incomeTransactionStatistics = useSelector(
    incomeTransactionStatisticsSelector,
  );

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
        borderRadius: 0,
      },
    },
  ];

  const chartConfig = chartConfigs[0];

  // Segment control
  const onChangeSegment = (event: any) => {
    setSelectedTypeIndex(event.nativeEvent.selectedSegmentIndex);
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
            data={expenseTransactionStatistics.filter(item => {
              return (item.population ?? 0) > 0;
            })}
            height={height}
            width={width}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="5"
          />
        ) : (
          <PieChart
            data={incomeTransactionStatistics.filter(item => {
              return (item.population ?? 0) > 0;
            })}
            height={height}
            width={width}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="5"
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
