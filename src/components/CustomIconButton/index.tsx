import colors from '@themes/colors';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  source: ImageSourcePropType;
  tintColor?: string;
  iconWidth?: number;
  iconHeight?: number;
  containerWidth?: number;
  containerHeight?: number;
  onPress?: () => void;
}

const CustomIconButton: React.FC<Props> = ({
  source,
  tintColor,
  iconWidth = 40,
  iconHeight = 40,
  containerWidth = 32,
  containerHeight = 32,
  onPress,
}) => {
  return (
    <Container
      width={containerWidth}
      height={containerHeight}
      onPress={onPress}>
      <Icon
        width={iconWidth}
        height={iconHeight}
        source={source}
        tintColor={tintColor}
      />
    </Container>
  );
};

const Container = styled.TouchableOpacity<{width?: number; height?: number}>`
  width: ${props => props.width ?? 0}px;
  height: ${props => props.height ?? 0}px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.Image<{
  width?: number;
  height?: number;
  tintColor?: string;
}>`
  width: ${props => props.width ?? 0}px;
  height: ${props => props.height ?? 0}px;
  tint-color: ${props => props.tintColor ?? colors.SILVER};
`;

export default React.memo(CustomIconButton);
