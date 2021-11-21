import {createRef} from 'react';
import {StackActions} from '@react-navigation/native';
import {
  StackNavigationOptions,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {updateRouteNameAction} from '@store/actionTypes/session';

export const navigationOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const dispatch = useDispatch();

export const navigationRef: any = createRef<any>();

export function navigate(name: string, params?: any) {
  dispatch(updateRouteNameAction(name));
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, params?: any) {
  dispatch(updateRouteNameAction(name));
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export const navigateReset = (stackName: string) => {
  dispatch(updateRouteNameAction(stackName));
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: stackName}],
  });
};
