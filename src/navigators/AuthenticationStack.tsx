import React from 'react';
import {navigationOptions} from './index';
import SignInScreen from '@screens/signIn';
import SignUpScreen from '@screens/signUp';
import {ScreenName} from '@constants/Constants';
import PinCodeScreen from '@screens/signUp/PinCodeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import CountryCodeScreen from '@screens/signUp/CountryCodeScreen';
import NewPasswordScreen from '@screens/signUp/NewPasswordScreen';
import ManualSignInScreen from '@screens/signIn/ManualSignInScreen';
import ForgotPasswordScreen from '@screens/signUp/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name={ScreenName.SignInScreen} component={SignInScreen} />
      <Stack.Screen
        name={ScreenName.ManualSignInScreen}
        component={ManualSignInScreen}
      />
      <Stack.Screen name={ScreenName.SignUpScreen} component={SignUpScreen} />
      <Stack.Screen name={ScreenName.PinCodeScreen} component={PinCodeScreen} />

      <Stack.Screen
        name={ScreenName.CountryCodeScreen}
        component={CountryCodeScreen}
      />
      <Stack.Screen
        name={ScreenName.NewPasswordScreen}
        component={NewPasswordScreen}
      />
      <Stack.Screen
        name={ScreenName.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
