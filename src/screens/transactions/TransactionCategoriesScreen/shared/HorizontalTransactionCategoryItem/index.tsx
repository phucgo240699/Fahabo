import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {getNumberWithCommas} from '@utils/index';
import {TransactionCategoryType} from '@constants/types/transactions';

interface Props {
  item: TransactionCategoryType;
  onPress?: (item: any) => void;
}

const HorizontalTransactionCategoryItem: React.FC<Props> = ({
  item,
  onPress,
}) => {
  const onPressContainer = () => {
    if (onPress) {
      onPress(item);
    }
  };
  return (
    <Container onPress={onPressContainer} activeOpacity={1}>
      <Icon source={{uri: item.icon}} />
      <Title numberOfLines={2}>{item.title}</Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  height: 60px;
  align-items: center;
  flex-direction: row;
  padding: 0px 20px 0px 20px;
  background-color: ${colors.WHITE};
`;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
`;

const Title = styled(fonts.PrimaryFontMediumSize14)`
  margin-left: 15px;
`;

export default HorizontalTransactionCategoryItem;
