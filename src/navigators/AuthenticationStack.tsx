import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import SignInScreen from '@screens/signIn';
import SignUpScreen from '@screens/signUp';
import PinCodeScreen from '@screens/signUp/PinCodeScreen';
import CountryCodeScreen from '@screens/signUp/CountryCodeScreen';
import NewPasswordScreen from '@screens/signUp/NewPasswordScreen';
import ManualSignInScreen from '@screens/signIn/ManualSignInScreen';
import ScanFamilyQRScreen from '@screens/families/ScanFamilyQRScreen';
import ForgotPasswordScreen from '@screens/signUp/ForgotPasswordScreen';
import FamilyOptionsScreen from '@screens/families/FamilyOptionsScreen';

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
        name={ScreenName.FamilyOptionsScreen}
        component={FamilyOptionsScreen}
      />
      <Stack.Screen
        name={ScreenName.ScanFamilyQRScreen}
        component={ScanFamilyQRScreen}
      />

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
