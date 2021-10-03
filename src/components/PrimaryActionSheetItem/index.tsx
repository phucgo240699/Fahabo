import React from 'react';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import styled from 'styled-components/native';

interface Props {
  title: string;
  titleColor?: string;
  onPress?: () => void;
}

const PrimaryActionSheetItem: React.FC<Props> = ({
  title,
  titleColor,
  onPress,
}) => {
  return (
    <Container onPress={onPress}>
      <Title textColor={titleColor}>{title}</Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{marginTop?: number}>`
  width: 100%;
  height: 50px;
  justify-content: center;
  margin-top: ${props => props.marginTop ?? 0}px;
`;

const Title = styled(fonts.PrimaryFontMediumSize16)<{textColor?: string}>`
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  color: ${props => props.textColor ?? colors.DANUBE};
`;

export default React.memo(PrimaryActionSheetItem);
