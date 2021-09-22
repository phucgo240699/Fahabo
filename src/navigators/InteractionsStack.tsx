import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import InteractionsScreen from '@screens/interactions';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const InteractionsStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.InteractionsScreen}
        component={InteractionsScreen}
      />
    </Stack.Navigator>
  );
};

export default InteractionsStack;
