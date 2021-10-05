import React from 'react';
import BottomTabs from './BottomTabs';
import {navigationOptions} from './index';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenName} from '@constants/Constants';
import ImageViewerScreen from '@screens/media/ImageViewerScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen
        name={ScreenName.ImageViewerScreen}
        component={ImageViewerScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
