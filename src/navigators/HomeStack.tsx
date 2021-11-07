import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import HomeScreen from '@screens/home';
import CreateChoreScreen from '@screens/chores/CreateChoreScreen';
import MembersPickerScreen from '@screens/families/MembersPickerScreen';
import RepeatPickerScreen from '@screens/chores/RepeatPickerScreen';
import ChoreDetailScreen from '@screens/chores/ChoreDetailScreen';
import ChorePhotosScreen from '@screens/chores/ChorePhotosScreen';
import EventsScreen from '@screens/events';
import CreateEventScreen from '@screens/events/CreateEventScreen';
import CalendarEventsScreen from '@screens/events/CalendarEventsScreen';
import EventDetailScreen from '@screens/events/EventDetailScreen';
import EventPhotosScreen from '@screens/events/EventPhotosScreen';

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
      <Stack.Screen
        name={ScreenName.ChoreDetailScreen}
        component={ChoreDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.ChorePhotosScreen}
        component={ChorePhotosScreen}
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
      <Stack.Screen
        name={ScreenName.EventDetailScreen}
        component={EventDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.EventPhotosScreen}
        component={EventPhotosScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
