import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import ProfileScreen from '@screens/profile';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.ProfileScreen}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
