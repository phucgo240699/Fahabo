import React from 'react';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import styled from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import {navigationOptions} from './index';
import {StackName} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import colors from '@themes/colors';
import {
  homeIcon,
  selectedHomeIcon,
  profileIcon,
  selectedProfileIcon,
} from '@constants/sources/index';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconSource = homeIcon;
          switch (route.name) {
            case StackName.HomeStack:
              iconSource = focused ? selectedHomeIcon : homeIcon;
              break;
            case StackName.ProfileStack:
              iconSource = focused ? selectedProfileIcon : profileIcon;
              break;
            default:
              break;
          }
          return (
            <PrimaryIcon
              width={size}
              height={size}
              tintColor={colors.THEME_COLOR_5}
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
        name={StackName.ProfileStack}
        component={ProfileStack}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
