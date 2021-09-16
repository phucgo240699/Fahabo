import React from 'react';
import BottomTabs from './BottomTabs';
import {navigationOptions} from './index';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
