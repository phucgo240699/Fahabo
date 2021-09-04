import {createRef} from 'react';
import {StackActions} from '@react-navigation/native';
import {
  StackNavigationOptions,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {DrawerNavigationOptions} from '@react-navigation/drawer';

export const navigationOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureResponseDistance: 120,
  gestureVelocityImpact: 0.5,
};

export const drawerOptions: DrawerNavigationOptions = {
  headerShown: false,
};

export const navigationRef = createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export const navigateReset = (stackName: string) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: stackName}],
  });
};
