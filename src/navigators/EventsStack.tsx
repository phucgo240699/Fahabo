import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import EventsScreen from '@screens/events/index';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

interface Props {}

const EventsStack: React.FC<Props> = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name={ScreenName.EventsScreen} component={EventsScreen} />
    </Stack.Navigator>
  );
};

export default EventsStack;
