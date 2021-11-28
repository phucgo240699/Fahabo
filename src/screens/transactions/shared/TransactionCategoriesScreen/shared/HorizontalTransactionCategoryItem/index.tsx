import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {getNumberWithCommas} from '@utils/index';

interface Props {
  item: any;
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
    <Container onPress={onPressContainer}>
      <Icon source={{uri: item.uri}} />
      <Title numberOfLines={2}>{item.name}</Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 10px 20px 15px 20px;
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
