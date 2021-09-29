import React, {useEffect} from 'react';
import {navigationOptions} from './index';
import AuthenticationStack from './AuthenticationStack';
import {AuthState, ScreenName, StackName} from '@constants/Constants';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import SplashScreen from 'react-native-splash-screen';
import FlashScreen from '@screens/flashScreen/index';

const Stack = createStackNavigator();
interface Props {
  authState: AuthState;
}

const AppStack: React.FC<Props> = ({authState}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator screenOptions={navigationOptions}>
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
