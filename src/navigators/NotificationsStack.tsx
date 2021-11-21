import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import NotificationsScreen from '@screens/notifications';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const NotificationsStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.NotificationsScreen}
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};

export default NotificationsStack;
