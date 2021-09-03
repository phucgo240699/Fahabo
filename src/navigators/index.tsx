import {createRef} from 'react';
import {StackActions} from '@react-navigation/native';
import {
  StackNavigationOptions,
  CardStyleInterpolators,
} from '@react-navigation/stack';

export const navigationOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  gestureResponseDistance: 120,
  gestureVelocityImpact: 0.5,
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
