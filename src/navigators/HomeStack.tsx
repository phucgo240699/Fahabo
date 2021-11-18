import React from 'react';
import HomeScreen from '@screens/home';
import {navigationOptions} from './index';
import EventsScreen from '@screens/events';
import {ScreenName, StackName} from '@constants/Constants';
import {createStackNavigator} from '@react-navigation/stack';
import CreateEventScreen from '@screens/events/CreateEventScreen';
import CreateChoreScreen from '@screens/chores/CreateChoreScreen';
import RepeatPickerScreen from '@screens/chores/RepeatPickerScreen';
import CalendarEventsScreen from '@screens/events/CalendarEventsScreen';
import MembersPickerScreen from '@screens/families/MembersPickerScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name={ScreenName.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={ScreenName.CreateChoreScreen}
        component={CreateChoreScreen}
      />
      <Stack.Screen
        name={ScreenName.MembersPickerScreen}
        component={MembersPickerScreen}
      />
      <Stack.Screen
        name={ScreenName.RepeatPickerScreen}
        component={RepeatPickerScreen}
      />
      <Stack.Screen name={ScreenName.EventsScreen} component={EventsScreen} />
      <Stack.Screen
        name={ScreenName.CreateEventScreen}
        component={CreateEventScreen}
      />
      <Stack.Screen
        name={ScreenName.CalendarEventsScreen}
        component={CalendarEventsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
