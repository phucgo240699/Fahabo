import MainStack from './MainStack';
import React, {useEffect} from 'react';
import {navigationOptions} from './index';
import FlashScreen from '@screens/flashScreen/index';
import SplashScreen from 'react-native-splash-screen';
import AuthenticationStack from './AuthenticationStack';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenName, StackName} from '@constants/Constants';

const Stack = createStackNavigator();

const AppStack: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={StackName.MainStack}
      screenOptions={navigationOptions}>
      <Stack.Screen name={ScreenName.FlashScreen} component={FlashScreen} />
      <Stack.Screen
        name={StackName.AuthenticationStack}
        component={AuthenticationStack}
      />
      <Stack.Screen name={StackName.MainStack} component={MainStack} />
    </Stack.Navigator>
  );
};

export default AppStack;
