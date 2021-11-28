import React from 'react';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {getNumberWithCommas} from '@utils/index';

interface Props {
  item: any;
}

const HorizontalTransactionItem: React.FC<Props> = ({item}) => {
  return (
    <Container>
      <Content>
        <Title numberOfLines={2}>{item.name}</Title>
        <Money
          numberOfLines={1}
          color={item.cost >= 0 ? colors.GREEN_1 : colors.RED_1}>
          {getNumberWithCommas(item.cost)}
        </Money>
      </Content>
      <Icon source={{uri: item.uri}} />
    </Container>
  );
};

const Container = styled.View`
  elevation: 10;
  padding: 10px 20px 15px 20px;
  shadow-radius: 10px;
  shadow-opacity: 0.2;
  border-radius: 10px;
  flex-direction: row;
  margin: 10px 30px 0px 30px;
  shadow-color: ${colors.BLACK};
  background-color: ${colors.WHITE};
`;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
`;

const Content = styled.View`
  flex: 1;
  margin-right: 15px;
  justify-content: space-between;
`;

const Title = styled(fonts.PrimaryFontMediumSize14)``;

const Money = styled(fonts.PrimaryFontBoldSize16)<{color: string}>`
  color: ${props => props.color};
`;

export default HorizontalTransactionItem;
