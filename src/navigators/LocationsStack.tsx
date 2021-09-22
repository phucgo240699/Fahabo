import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import LocationsScreen from '@screens/locations';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const LocationsStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.LocationsScreen}
        component={LocationsScreen}
      />
    </Stack.Navigator>
  );
};

export default LocationsStack;
