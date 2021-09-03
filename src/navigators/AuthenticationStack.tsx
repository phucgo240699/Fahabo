import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import SignInScreen from '@screens/signIn';
import SignUpScreen from '@screens/signUp';
import PinCodeScreen from '@screens/signUp/PinCodeScreen';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...navigationOptions,
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenName.SignInScreen} component={SignInScreen} />
      <Stack.Screen name={ScreenName.SignUpScreen} component={SignUpScreen} />
      <Stack.Screen name={ScreenName.PinCodeScreen} component={PinCodeScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
