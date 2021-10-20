import React from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import colors from '@themes/colors';

interface Props {
  loading: boolean;
}

const FooterLoadingIndicator: React.FC<Props> = ({loading}) => {
  return (
    <Loading>
      {loading && <ActivityIndicator size="large" color={colors.SILVER} />}
    </Loading>
  );
};

const Loading = styled.View`
  height: 50px;
  align-items: center;
  justify-content: flex-end;
`;

export default FooterLoadingIndicator;
