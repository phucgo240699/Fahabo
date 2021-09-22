import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import TransactionsScreen from '@screens/transactions';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const TransactionsStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.TransactionsScreen}
        component={TransactionsScreen}
      />
    </Stack.Navigator>
  );
};

export default TransactionsStack;
