import React from 'react';
import colors from '@themes/colors';
import {navigationOptions} from './index';
import {StackName} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import LocationsStack from './LocationsStack';
import TransactionsStack from './TransactionsStack';
import InteractionsStack from './InteractionsStack';
import {
  homeIcon,
  selectedHomeIcon,
  transactionsIcon,
  selectedTransactionsIcon,
  interactionsIcon,
  selectedInteractionsIcon,
  locationsIcon,
  selectedLocationsIcon,
  profileIcon,
  selectedProfileIcon,
} from '@constants/sources/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconSource = homeIcon;
          let tintColor = colors.THEME_COLOR_5;
          switch (route.name) {
            case StackName.HomeStack:
              iconSource = focused ? selectedHomeIcon : homeIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.TransactionsStack:
              iconSource = focused
                ? selectedTransactionsIcon
                : transactionsIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.InteractionsStack:
              iconSource = focused
                ? selectedInteractionsIcon
                : interactionsIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.LocationsStack:
              iconSource = focused ? selectedLocationsIcon : locationsIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.ProfileStack:
              iconSource = focused ? selectedProfileIcon : profileIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            default:
              break;
          }
          return (
            <PrimaryIcon
              width={size}
              height={size}
              tintColor={tintColor}
              source={iconSource}
            />
          );
        },
        tabBarLabel: () => <></>,
      })}>
      <Tab.Screen
        name={StackName.HomeStack}
        component={HomeStack}
        options={navigationOptions}
      />
      <Tab.Screen
        name={StackName.TransactionsStack}
        component={TransactionsStack}
        options={navigationOptions}
      />
      <Tab.Screen
        name={StackName.InteractionsStack}
        component={InteractionsStack}
        options={navigationOptions}
      />
      <Tab.Screen
        name={StackName.LocationsStack}
        component={LocationsStack}
        options={navigationOptions}
      />
      <Tab.Screen
        name={StackName.ProfileStack}
        component={ProfileStack}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
