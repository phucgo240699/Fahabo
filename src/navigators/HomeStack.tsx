import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import HomeScreen from '@screens/home';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.HomeScreen}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
