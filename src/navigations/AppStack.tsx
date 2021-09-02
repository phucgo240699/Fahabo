import React from 'react';
// import AuthenticationStack from './AuthenticationStack';
import MainStack from './MainStack';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthState, StackName} from '@constants/Constants';
// import {navigationOptions} from './index';

const Stack = createStackNavigator();

const AppStack = () => {
  const authState = AuthState.LOGGED_IN;

  switch (authState) {
    case AuthState.LOGGED_IN:
      return (
        <Stack.Navigator>
          <Stack.Screen
            name={StackName.MainStack}
            component={MainStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );

    // default:
    //   return (
    //     <Stack.Navigator screenOptions={navigationOptions}>
    //       <Stack.Screen
    //         name="AuthStack"
    //         component={AuthenticationStack}
    //         options={{headerShown: false}}
    //       />
    //     </Stack.Navigator>
    //   );
  }
};

export default AppStack;
