import {useState} from 'react';
import {Platform} from 'react-native';
import React, {useEffect} from 'react';
import ImageView from 'react-native-image-viewing';
import {getInset} from 'react-native-safe-area-view';
import styled from 'styled-components/native';
import colors from '@themes/colors';
import fonts from '@themes/fonts';

interface Props {
  imageIndex: number;
  imageCount: number;
}
const bottomInset = getInset('bottom', false);

const ImageViewerFooter: React.FC<Props> = ({imageIndex, imageCount}) => {
  return (
    <Container>
      <Text>{`${imageIndex}/${imageCount}`}</Text>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${bottomInset}px;
  background-color: #00000080;
`;
const Text = styled(fonts.PrimaryFontRegularSize14)`
  color: #ffffff;
`;

export default React.memo(ImageViewerFooter);
