import React from 'react';
import {drawerOptions} from './index';
import {StackName} from '@constants/Constants';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import {Box} from 'native-base';

const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Drawer.Navigator screenOptions={drawerOptions}>
      <Drawer.Screen name={StackName.HomeStack} component={HomeStack} />
      <Drawer.Screen name={StackName.ProfileStack} component={ProfileStack} />
    </Drawer.Navigator>
  );
};

export default MainStack;
