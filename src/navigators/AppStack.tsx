import React from 'react';
import {navigationOptions} from './index';
import AuthenticationStack from './AuthenticationStack';
import {AuthState, StackName} from '@constants/Constants';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';

const Stack = createStackNavigator();

interface Props {
  authState: AuthState;
}

const AppStack: React.FC<Props> = ({authState}) => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={StackName.AuthenticationStack}
        component={AuthenticationStack}
      />
      <Stack.Screen name={StackName.MainStack} component={MainStack} />
    </Stack.Navigator>
  );
};

export default AppStack;
