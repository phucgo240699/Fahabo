import React from 'react';
import {drawerOptions} from './index';
import {StackName} from '@constants/Constants';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import i18n from '@locales/index';
import HomeStack from './HomeStack';
import TasksStack from './ChoresStack';
import EventsStack from './EventsStack';
import ProfileStack from './ProfileStack';
import {CustomDrawerContent} from './SideBar';
import PrimaryIcon from '@components/PrimaryIcon';

const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={drawerOptions}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}>
      <Drawer.Screen
        name={StackName.HomeStack}
        component={HomeStack}
        options={{
          title: i18n.t('sideBar.home'),
          drawerIcon: ({color, size, focused}) => {
            return (
              <PrimaryIcon
                width={size}
                height={size}
                tintColor={color}
                source={
                  focused
                    ? require('@assets/images/selected_home_icon.png')
                    : require('@assets/images/home_icon.png')
                }
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={StackName.ChoresStack}
        component={TasksStack}
        options={{
          title: i18n.t('sideBar.chores'),
          drawerIcon: ({color, size, focused}) => {
            return (
              <PrimaryIcon
                width={size}
                height={size}
                tintColor={color}
                source={
                  focused
                    ? require('@assets/images/selected_chores_icon.png')
                    : require('@assets/images/chores_icon.png')
                }
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={StackName.EventStack}
        component={EventsStack}
        options={{
          title: i18n.t('sideBar.events'),
          drawerIcon: ({color, size, focused}) => {
            return (
              <PrimaryIcon
                width={size}
                height={size}
                tintColor={color}
                source={
                  focused
                    ? require('@assets/images/selected_events_icon.png')
                    : require('@assets/images/events_icon.png')
                }
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={StackName.ProfileStack}
        component={ProfileStack}
        options={{
          title: i18n.t('sideBar.profile'),
          drawerIcon: ({color, size, focused}) => {
            return (
              <PrimaryIcon
                width={size}
                height={size}
                tintColor={color}
                source={
                  focused
                    ? require('@assets/images/selected_profile_icon.png')
                    : require('@assets/images/profile_icon.png')
                }
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainStack;
