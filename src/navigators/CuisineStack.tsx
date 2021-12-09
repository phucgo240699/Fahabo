import React from 'react';
import {navigationOptions} from './index';
import {ScreenName} from '@constants/Constants';
import CuisinePostsScreen from '@screens/cuisine';
import {createStackNavigator} from '@react-navigation/stack';
import CreateCuisinePostScreen from '@screens/cuisine/CreateCuisinePostScreen';

const Stack = createStackNavigator();

const CuisineStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.CuisinePostsScreen}
        component={CuisinePostsScreen}
      />
      <Stack.Screen
        name={ScreenName.CreateCuisinePostScreen}
        component={CreateCuisinePostScreen}
      />
    </Stack.Navigator>
  );
};

export default CuisineStack;
