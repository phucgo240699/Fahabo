import {Box} from 'native-base';
import colors from '@themes/colors';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styled from 'styled-components/native';
import {backButtonIcon} from '@constants/sources';
import PrimaryIcon from '@components/PrimaryIcon';
import Geolocation from 'react-native-geolocation-service';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  memberLocationsSelector,
  regionSelector,
} from '@store/selectors/locations';
import {updateNewLocationRequestType} from '@store/actionTypes/locations';
import {fcmTokenSelector} from '@store/selectors/authentication';
import MemberLocationMarker from './shared/MemberLocationMarker';

interface Props {}

const LocationsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const region = useSelector(regionSelector);
  const fcmToken = useSelector(fcmTokenSelector);
  const memberLocations = useSelector(memberLocationsSelector);

  // Life Cycle
  useEffect(() => {
    adaptMemberLocationsAndRegion();
    const refreshIntervalId = setInterval(adaptMemberLocations, 20000);

    return () => {
      clearInterval(refreshIntervalId);
    };
  }, []);

  const adaptMemberLocationsAndRegion = () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(
          updateNewLocationRequestType({
            firebaseToken: fcmToken,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            showHUD: true,
          }),
        );
      },
      error => {
        console.log(error);
      },
      {
        timeout: 15000,
      },
    );
  };

  const adaptMemberLocations = () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(
          updateNewLocationRequestType({
            firebaseToken: fcmToken,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            onlyMemberLocations: true,
          }),
        );
      },
      error => {
        console.log(error);
      },
      {
        timeout: 15000,
      },
    );
  };

  const onPressFocus = () => {
    adaptMemberLocationsAndRegion();
  };

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
      <MapView style={styles.map} region={region}>
        {memberLocations.map((_memberLocation, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: _memberLocation.latitude,
                longitude: _memberLocation.longitude,
              }}>
              <MemberLocationMarker
                name={_memberLocation.name}
                avatar={_memberLocation.avatar}
              />
            </Marker>
          );
        })}
      </MapView>
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
  margin-left: 15px;
  margin-top: ${getStatusBarHeight() + 15}px;
`;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default LocationsScreen;
