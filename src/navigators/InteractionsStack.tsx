import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import InteractionsScreen from '@screens/interactions';
import {createStackNavigator} from '@react-navigation/stack';
import ConferenceCallScreen from '@screens/interactions/ConferenceCallScreen';

const Stack = createStackNavigator();

const InteractionsStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.InteractionsScreen}
        component={InteractionsScreen}
      />
      <Stack.Screen
        name={ScreenName.ConferenceCallScreen}
        component={ConferenceCallScreen}
      />
    </Stack.Navigator>
  );
};

export default InteractionsStack;
