import React from 'react';
import {Box} from 'native-base';
import colors from '@themes/colors';
import styled from 'styled-components/native';
import {Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MapView from 'react-native-maps';
import PrimaryButton from '@components/PrimaryButton';
import {backButtonIcon} from '@constants/sources';
import {CommonActions, useNavigation} from '@react-navigation/native';
import PrimaryIcon from '@components/PrimaryIcon';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {}

const LocationsScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation();

  // Navigation Back
  const onPressBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Box position={'absolute'}>
        <BackButton onPress={onPressBack}>
          <PrimaryIcon width={48} height={48} source={backButtonIcon} />
        </BackButton>
      </Box>
    </SafeView>
  );
};

const SafeView = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const BackButton = styled.TouchableOpacity`
  margin-top: ${getStatusBarHeight() + 5}px;
  margin-left: 15px;
`;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default LocationsScreen;
