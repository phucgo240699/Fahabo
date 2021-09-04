import React from 'react';
import AuthenticationStack from './AuthenticationStack';
import MainStack from './MainStack';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthState, StackName} from '@constants/Constants';
import {navigationOptions} from './index';

const Stack = createStackNavigator();

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
        <Stack.Navigator>
          <Stack.Screen
            name={StackName.MainStack}
            component={MainStack}
          />
        </Stack.Navigator>
      );
  }
};

export default AppStack;
