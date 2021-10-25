import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import HomeScreen from '@screens/home';
import CreateChoreScreen from '@screens/chores/CreateChoreScreen';
import MembersPickerScreen from '@screens/families/MembersPickerScreen';
import RepeatPickerScreen from '@screens/chores/RepeatPickerScreen';

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
    </Stack.Navigator>
  );
};

export default HomeStack;
