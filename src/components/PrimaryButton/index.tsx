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
  leftSource?: ImageSourcePropType;
  rightSource?: ImageSourcePropType;
  leftTintColor?: string;
  rightTintColor?: string;
  iconLeftWidth?: number;
  iconLeftHeight?: number;
  iconRightWidth?: number;
  iconRightHeight?: number;
  space?: number;
  padding?: number;
  containerStyle?: any;
  onPress?: () => void;
}

const PrimaryButton: React.FC<Props> = ({
  title,
  titleColor = colors.BLACK,
  titleFontSize = 14,
  titleFontWeight = 400,
  leftSource,
  rightSource,
  leftTintColor,
  rightTintColor,
  iconLeftWidth = 28,
  iconLeftHeight = 28,
  iconRightWidth = 28,
  iconRightHeight = 28,
  space = 4,
  padding = 4,
  containerStyle,
  onPress,
}) => {
  return (
    <Container padding={padding} style={containerStyle} onPress={onPress}>
      {leftSource && (
        <Icon
          width={iconLeftWidth}
          height={iconLeftHeight}
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
          width={iconRightWidth}
          height={iconRightHeight}
          source={rightSource}
          tintColor={rightTintColor}
        />
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity<{
  padding: number;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${props => props.padding}px;
`;

const Icon = styled.Image<{
  width?: number;
  height?: number;
  marginLeft?: number;
  tintColor?: string;
}>`
  width: ${props => props.width ?? 0}px;
  height: ${props => props.height ?? 0}px;
  margin-left: ${props => props.marginLeft ?? 0}px;
  tint-color: ${props => props.tintColor ?? colors.SILVER};
`;

export default React.memo(PrimaryButton);
