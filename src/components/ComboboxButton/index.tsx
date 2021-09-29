import PrimaryIcon from '@components/PrimaryIcon';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {downArrowIcon} from '@constants/sources/index';
import colors from '@themes/colors';

interface Props {
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  value?: string;
  textColor?: string;
  onPress?: () => void;
}

const ComboboxButton: React.FC<Props> = ({
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  value = '',
  textColor = colors.BLACK,
  onPress,
}) => {
  return (
    <Container
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}>
      <Touch onPress={onPress}>
        <Title textColor={textColor}>{value}</Title>
        <PrimaryIcon width={18} height={18} source={downArrowIcon} />
      </Touch>
    </Container>
  );
};

const Container = styled.View<{
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}>`
  height: 45px;
  border-width: 1px;
  border-radius: 6px;
  border-color: ${colors.SILVER};
`;

const Touch = styled.TouchableOpacity`
  flex: 1;
  padding-left: 10px;
  padding-right: 20px
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(fonts.PrimaryFontMediumSize14)<{textColor: string}>`
  color: ${props => props.textColor};
`;

export default React.memo(ComboboxButton);
