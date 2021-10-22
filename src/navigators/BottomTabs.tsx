import React from 'react';
import colors from '@themes/colors';
import {StackName} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import HomeStack from './HomeStack';
import FamilyStack from './FamilyStack';
import ProfileStack from './ProfileStack';
import TransactionsStack from './TransactionsStack';
import InteractionsStack from './InteractionsStack';
import {
  homeIcon,
  selectedHomeIcon,
  transactionsIcon,
  selectedTransactionsIcon,
  interactionsIcon,
  selectedInteractionsIcon,
  profileIcon,
  selectedProfileIcon,
  selectedFamilyIcon,
  familyIcon,
} from '@constants/sources/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: colors.WHITE},
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
            case StackName.FamilyStack:
              iconSource = focused ? selectedFamilyIcon : familyIcon;
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
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={StackName.TransactionsStack}
        component={TransactionsStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={StackName.InteractionsStack}
        component={InteractionsStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={StackName.FamilyStack}
        component={FamilyStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={StackName.ProfileStack}
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
