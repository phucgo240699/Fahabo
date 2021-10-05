import React from 'react';
import colors from '@themes/colors';
import fonts from '@themes/fonts';
import styled from 'styled-components/native';

interface ContainerProps {
  disabled?: boolean;
  transparent?: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  backgroundColor?: string;
}

interface TitleProps {
  disabled?: boolean;
  transparent?: boolean;
}

interface Props {
  disabled?: boolean;
  transparent?: boolean; // true: background is transparent, border color and text color is mango
  title: string;
  leftIcon?: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  backgroundColor?: string;
  style?: object;
  onPress?: () => void;
}

const SecondaryButton: React.FC<Props> = ({
  disabled = false,
  transparent = false,
  title,
  leftIcon,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundColor,
  style,
  onPress,
  ...otherProps
}) => {
  return (
    <Container
      {...otherProps}
      disabled={disabled}
      transparent={transparent}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      style={style}
      backgroundColor={backgroundColor}
      onPress={onPress}>
      {leftIcon}
      <Title disabled={disabled} transparent={transparent} numberOfLines={1}>
        {title}
      </Title>
    </Container>
  );
};

const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: center;
  height: 50px;
  border-width: 1px;
  border-radius: 35px;
  padding-horizontal: 30px;
  margin-top: ${props => props.marginTop ?? 0}px;
  margin-bottom: ${props => props.marginBottom ?? 0}px;
  margin-left: ${props => props.marginLeft ?? 0}px;
  margin-right: ${props => props.marginRight ?? 0}px;
  background-color: ${props =>
    props.disabled === true
      ? colors.SILVER
      : props.transparent === true
      ? 'transparent'
      : props.backgroundColor ?? colors.THEME_COLOR_6};
  border-color: ${props =>
    props.disabled === true
      ? colors.SILVER
      : props.backgroundColor ?? colors.THEME_COLOR_6};
`;

const Title = styled(fonts.PrimaryFontBoldSize16)<TitleProps>`
  color: ${props =>
    props.disabled === true
      ? colors.WHITE
      : props.transparent === true
      ? props.backgroundColor ?? colors.THEME_COLOR_6
      : colors.WHITE};
  padding-horizontal: 20px;
  font-weight: 700;
`;

export default SecondaryButton;
