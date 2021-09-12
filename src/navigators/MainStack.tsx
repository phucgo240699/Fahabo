import React from 'react';
import {drawerOptions} from './index';
import {StackName} from '@constants/Constants';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import i18n from '@locales/index';
import HomeStack from './HomeStack';
import TasksStack from './TasksStack';
import EventsStack from './EventsStack';
import ProfileStack from './ProfileStack';
import {CustomDrawerContent} from './SideBar';

const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={drawerOptions}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}>
      <Drawer.Screen name={i18n.t('sideBar.home')} component={HomeStack} />
      <Drawer.Screen name={i18n.t('sideBar.tasks')} component={TasksStack} />
      <Drawer.Screen name={i18n.t('sideBar.events')} component={EventsStack} />
      <Drawer.Screen
        name={i18n.t('sideBar.profile')}
        component={ProfileStack}
      />
    </Drawer.Navigator>
  );
};

export default MainStack;
