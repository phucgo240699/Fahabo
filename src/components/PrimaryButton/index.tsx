import React from 'react';
import {Text} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {ImageSourcePropType} from 'react-native';

interface Props {
  title?: string;
  titleColor?: string;
  titleFontSize?: number;
  titleFontWeight?: number;
  leftTintColor?: string;
  leftIconWidth?: number;
  leftIconHeight?: number;
  leftSource?: ImageSourcePropType;
  rightTintColor?: string;
  rightIconWidth?: number;
  rightIconHeight?: number;
  rightSource?: ImageSourcePropType;
  space?: number;
  padding?: number;
  containerStyle?: any;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  onPress?: () => void;
}

const PrimaryButton: React.FC<Props> = ({
  title,
  titleColor = colors.BLACK,
  titleFontSize = 14,
  titleFontWeight = 400,
  leftTintColor,
  leftIconWidth = 24,
  leftIconHeight = 24,
  leftSource,
  rightTintColor,
  rightIconWidth = 24,
  rightIconHeight = 24,
  rightSource,
  space = 4,
  padding = 4,
  containerStyle,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  onPress,
  ...otherProps
}) => {
  return (
    <Container
      padding={padding}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      style={containerStyle}
      onPress={onPress}
      {...otherProps}>
      {leftSource && (
        <Icon
          width={leftIconWidth}
          height={leftIconHeight}
          source={leftSource}
          tintColor={leftTintColor}
        />
      )}
      {title && (
        <Text
          color={titleColor}
          fontSize={titleFontSize}
          fontWeight={titleFontWeight}
          ml={leftSource ? space : 0}
          mr={rightSource ? space : 0}>
          {title}
        </Text>
      )}
      {rightSource && (
        <Icon
          width={rightIconWidth}
          height={rightIconHeight}
          source={rightSource}
          tintColor={rightTintColor}
        />
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity<{
  padding: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${props => props.padding}px;
  margin-top: ${props => props.marginTop ?? 0}px;
  margin-left: ${props => props.marginLeft ?? 0}px;
  margin-right: ${props => props.marginRight ?? 0}px;
  margin-bottom: ${props => props.marginBottom ?? 0}px;
`;

const Icon = styled.Image<{
  width?: number;
  height?: number;
  marginLeft?: number;
  tintColor?: string;
}>`
  width: ${props => props.width ?? 0}px;
  height: ${props => props.height ?? 0}px;
  tint-color: ${props => props.tintColor ?? colors.SILVER};
`;

export default React.memo(PrimaryButton);
