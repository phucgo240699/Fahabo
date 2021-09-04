import React from 'react';
import {navigationOptions, drawerOptions} from './index';
import AuthenticationStack from './AuthenticationStack';
import {AuthState, StackName} from '@constants/Constants';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

interface Props {
  authState: AuthState;
}

const AppStack: React.FC<Props> = ({authState}) => {
  switch (authState) {
    case AuthState.UNAUTHORIZED:
      return (
        <Stack.Navigator screenOptions={navigationOptions}>
          <Stack.Screen
            name={StackName.AuthenticationStack}
            component={AuthenticationStack}
          />
        </Stack.Navigator>
      );

    default:
      return (
        <Drawer.Navigator screenOptions={drawerOptions}>
          <Drawer.Screen name={StackName.HomeStack} component={HomeStack} />
          <Drawer.Screen
            name={StackName.ProfileStack}
            component={ProfileStack}
          />
        </Drawer.Navigator>
      );
  }
};

export default AppStack;
