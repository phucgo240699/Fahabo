import React from 'react';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

const HUD = ({loading}: {loading: boolean}) => {
  if (!loading) {
    return null;
  }
  return (
    <DimmedOverlay>
      <ActivityIndicator
        animating={loading}
        color={colors.WHITE}
        size="large"
      />
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
