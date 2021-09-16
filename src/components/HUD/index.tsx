import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';

const LoadingImage = styled.Image`
  width: ${Constants.MAX_WIDTH * 0.3}px;
  height: ${Constants.MAX_WIDTH * 0.3}px;
`;

const HUD = ({loading}: {loading: boolean}) => {
  if (!loading) {
    return null;
  }
  return (
    <DimmedOverlay>
      <LoadingImage source={require('@assets/animations/loading.gif')} />
    </DimmedOverlay>
  );
};

const DimmedOverlay = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${colors.BLACK_ALPHA50};
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

export default React.memo(HUD);
