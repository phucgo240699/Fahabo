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
        color={colors.CONCRETE}
        size="large"
      />
    </DimmedOverlay>
  );
};

const DimmedOverlay = styled.View`
  flex: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${colors.BLACK_ALPHA50};
`;

export default React.memo(HUD);
