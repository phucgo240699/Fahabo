import React from 'react';
import fonts from '@themes/fonts';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {getNumberWithCommas} from '@utils/index';

interface Props {
  totalExpense: number;
  totalIncome: number;
  onPress?: () => void;
}

const TransactionHeader: React.FC<Props> = ({
  totalExpense,
  totalIncome,
  onPress,
}) => {
  return (
    <Container activeOpacity={0.6} onPress={onPress}>
      <RightContent>
        <RowBox>
          <IncomeLabel>{`${i18n.t('transaction.income')}:`}</IncomeLabel>
          <IncomeText numberOfLines={1}>
            {getNumberWithCommas(totalIncome)}
          </IncomeText>
        </RowBox>
        <RowBox>
          <IncomeLabel>{`${i18n.t('transaction.expense')}:`}</IncomeLabel>
          <ExpenseText numberOfLines={1}>{`-${getNumberWithCommas(
            totalExpense,
          )}`}</ExpenseText>
        </RowBox>
      </RightContent>
      <VLine />
      <LeftContent>
        <CashLabel>{i18n.t('transaction.cash')}</CashLabel>
        <MoneyText>{getNumberWithCommas(totalIncome - totalExpense)}</MoneyText>
      </LeftContent>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  height: 60px;
  elevation: 10;
  flex-direction: row;
  shadow-radius: 10px;
  shadow-opacity: 0.2;
  align-items: center;
  margin: 10px 0px 10px 0px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const LeftContent = styled.View`
  width: 140px;
  align-items: center;
  justify-content: center;
`;

const RightContent = styled.View`
  flex: 1;
  margin-left: 20px;
  justify-content: center;
`;

const RowBox = styled.View`
  flex-direction: row;
`;

const CashLabel = styled(fonts.PrimaryFontRegularSize12)`
  text-align: center;
  color: ${colors.SILVER};
`;

const MoneyText = styled(fonts.PrimaryFontBoldSize14)``;

const IncomeLabel = styled(fonts.PrimaryFontMediumSize14)`
  width: 80px;
  color: ${colors.SILVER};
`;

const IncomeText = styled(fonts.PrimaryFontBoldSize14)`
  margin-left: 5px;
  color: ${colors.GREEN_1};
`;
const ExpenseText = styled(fonts.PrimaryFontBoldSize14)`
  color: ${colors.RED_1};
`;

const VLine = styled.View`
  width: 2px;
  height: 80%;
  background-color: ${colors.CONCRETE};
`;

export default TransactionHeader;
