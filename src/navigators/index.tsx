import {createRef} from 'react';
import {StackActions} from '@react-navigation/native';
import {
  StackNavigationOptions,
  CardStyleInterpolators,
} from '@react-navigation/stack';

export const navigationOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const navigationRef: any = createRef<any>();

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
