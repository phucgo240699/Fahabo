import colors from '@themes/colors';
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

const rectanglePlaceHolder = require('@assets/images/loading_placeholder_image_rectangle.png');
const squarePlaceHolder = require('@assets/images/loading_placeholder_image_square.png');

interface Props {
  source: any;
  style?: any;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  imageShape?: 'square' | 'rectangle';
}
const PrimaryFastImage: React.FC<Props> = ({
  source,
  resizeMode,
  imageShape = 'square',
  ...otherProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);
  return (
    <Container {...otherProps}>
      {isLoading && (
        <PlaceHolderImage
          source={
            imageShape === 'square' ? squarePlaceHolder : rectanglePlaceHolder
          }
          style={StyleSheet.absoluteFill}
        />
      )}
      <FastImage
        onLoadEnd={onLoadEnd}
        source={{
          ...source,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={StyleSheet.absoluteFill}
        resizeMode={resizeMode}
      />
    </Container>
  );
};

const Container = styled.View`
  overflow: hidden;
`;

const PlaceHolderImage = styled.Image`
  width: null;
  height: null;
`;

export default memo(PrimaryFastImage);
