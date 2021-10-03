import React from 'react';
import {Box, Text} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';
import PrimaryHeader from '@components/PrimaryHeader';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {}

const LocationsScreen: React.FC<Props> = ({}) => {
  return (
    <Box flex={1} safeArea bgColor={colors.WHITE}>
      <Text color={colors.TEXT}>Locations</Text>
    </Box>
  );
};

export default LocationsScreen;
