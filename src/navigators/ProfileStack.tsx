import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import ProfileScreen from '@screens/profile';
import UpdateProfileScreen from '@screens/profile/UpdateProfileScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name={ScreenName.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={ScreenName.UpdateProfileScreen}
        component={UpdateProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
