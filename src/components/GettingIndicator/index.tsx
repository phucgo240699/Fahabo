import React from 'react';
import colors from '@themes/colors';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const GettingIndicator = () => {
  return <Indicator size={'large'} color={colors.SILVER} />;
};

const Indicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

export default React.memo(GettingIndicator);
