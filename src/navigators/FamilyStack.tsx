import {ScreenName} from '@constants/Constants';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumsScreen from '@screens/albums';
import AlbumDetailScreen from '@screens/albums/AlbumDetailScreen';
import FamiliesScreen from '@screens/families';
import FamilyDetailScreen from '@screens/families/FamilyDetailScreen';
import FamilyMembersScreen from '@screens/families/FamilyMembersScreen';
import QRPresenterScreen from '@screens/families/QRPresenterScreen';
import ScanFamilyQRScreen from '@screens/families/ScanFamilyQRScreen';
import CameraScreen from '@screens/media/CameraScreen';
import React from 'react';
import {navigationOptions} from './index';

interface Props {
  route?: any;
  navigation?: any;
}

const hiddenRouteNames: string[] = [
  ScreenName.CameraScreen,
  ScreenName.MediaPickerScreen,
  ScreenName.QRPresenterScreen,
];

const Stack = createStackNavigator();

const FamilyStack: React.FC<Props> = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (hiddenRouteNames.includes(routeName ?? '')) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: false});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name={ScreenName.FamiliesScreen}
        component={FamiliesScreen}
      />
      <Stack.Screen
        name={ScreenName.FamilyDetailScreen}
        component={FamilyDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.FamilyMembersScreen}
        component={FamilyMembersScreen}
      />
      <Stack.Screen
        name={ScreenName.QRPresenterScreen}
        component={QRPresenterScreen}
      />
      <Stack.Screen name={'CameraScreen'} component={CameraScreen} />
      <Stack.Screen
        name={ScreenName.ScanFamilyQRScreen}
        component={ScanFamilyQRScreen}
      />
      <Stack.Screen name={ScreenName.AlbumsScreen} component={AlbumsScreen} />
      <Stack.Screen
        name={ScreenName.AlbumDetailScreen}
        component={AlbumDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default FamilyStack;
