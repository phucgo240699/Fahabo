import colors from '@themes/colors';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import styled from 'styled-components/native';
import {marginLeft} from 'styled-system';

interface Props {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  style?: any;
  tintColor?: string;
}

const PrimaryIcon: React.FC<Props> = ({
  source,
  width = 28,
  height = 28,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  style,
  tintColor,
}) => {
  return (
    <Icon
      style={style}
      width={width}
      height={height}
      source={source}
      tintColor={tintColor}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
    />
  );
};

const Icon = styled.Image<{
  width?: number;
  height?: number;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  tintColor?: string;
}>`
  width: ${props => props.width ?? 0}px;
  height: ${props => props.height ?? 0}px;
  margin-top: ${props => props.marginTop ?? 0}px;
  margin-left: ${props => props.marginLeft ?? 0}px;
  margin-right: ${props => props.marginRight ?? 0}px;
  margin-bottom: ${props => props.marginBottom ?? 0}px;
  tint-color: ${props => props.tintColor ?? colors.SILVER};
`;

export default React.memo(PrimaryIcon);
