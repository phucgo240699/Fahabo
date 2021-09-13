import colors from '@themes/colors';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  tintColor?: string;
}

const PrimaryIcon: React.FC<Props> = ({
  source,
  width = 28,
  height = 28,
  tintColor,
}) => {
  return (
    <Icon source={source} width={width} height={height} tintColor={tintColor} />
  );
};

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

export default PrimaryIcon;
