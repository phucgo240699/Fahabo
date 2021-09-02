import {createRef} from 'react';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
// import HomeStack from './HomeStack';

export const navigationOptions: StackNavigationOptions = {
  // gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

export const navigationRef: any = createRef();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export const getNavigation = () => {
  return navigationRef.current;
};

// export { HomeStack };
