import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import HomeScreen from '@screens/home';
import CreateChoreScreen from '@screens/chores/CreateChoreScreen';
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
    </Stack.Navigator>
  );
};

export default HomeStack;
