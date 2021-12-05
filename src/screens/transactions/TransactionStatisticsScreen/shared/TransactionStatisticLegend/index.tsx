import React from 'react';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';
import {TransactionStatisticType} from '@constants/types/transactions';
import i18n from '@locales/index';

interface Props {
  item: TransactionStatisticType;
}

const TransactionStatisticLegend: React.FC<Props> = ({item}) => {
  return (
    <Container>
      <ColorBox backgroundColor={item.color} />
      <Title>
        {item.translated === true ? i18n.t(`backend.${item.name}`) : item.name}
      </Title>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 20px;
  margin-left: 30px;
  flex-direction: row;
`;

const ColorBox = styled.View<{backgroundColor: string}>`
  width: 50px;
  height: 20px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor};
`;

const Title = styled(fonts.PrimaryFontMediumSize12)`
  margin-left: 10px;
`;

export default TransactionStatisticLegend;
