import colors from '@themes/colors';
import React from 'react';
import {Text} from 'native-base';
import styled from 'styled-components/native';
import {ImageSourcePropType} from 'react-native';

interface Props {
  title?: string;
  titleColor?: string;
  leftSource?: ImageSourcePropType;
  rightSource?: ImageSourcePropType;
  leftTintColor?: string;
  rightTintColor?: string;
  iconLeftWidth?: number;
  iconLeftHeight?: number;
  iconRightWidth?: number;
  iconRightHeight?: number;
  padding?: number;
  onPress?: () => void;
}

const PrimaryButton: React.FC<Props> = ({
  title,
  titleColor = colors.BLACK,
  leftSource,
  rightSource,
  leftTintColor,
  rightTintColor,
  iconLeftWidth = 28,
  iconLeftHeight = 28,
  iconRightWidth = 28,
  iconRightHeight = 28,
  padding = 4,
  onPress,
}) => {
  return (
    <Container padding={padding} onPress={onPress}>
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
          ml={leftSource ? 4 : 0}
          mr={rightSource ? 4 : 0}>
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
