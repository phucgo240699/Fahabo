import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import ProfileScreen from '@screens/profile';
import MyChoresScreen from '@screens/chores/MyChoresScreen';
import MyEventsScreen from '@screens/events/MyEventsScreen';
import SettingsScreen from '@screens/settings';
import LanguageScreen from '@screens/settings/LanguageScreen';
import UpdateProfileScreen from '@screens/profile/UpdateProfileScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name={ScreenName.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={ScreenName.MyChoresScreen}
        component={MyChoresScreen}
      />
      <Stack.Screen
        name={ScreenName.MyEventsScreen}
        component={MyEventsScreen}
      />
      <Stack.Screen
        name={ScreenName.SettingsScreen}
        component={SettingsScreen}
      />
      <Stack.Screen
        name={ScreenName.LanguageScreen}
        component={LanguageScreen}
      />
      <Stack.Screen
        name={ScreenName.UpdateProfileScreen}
        component={UpdateProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
