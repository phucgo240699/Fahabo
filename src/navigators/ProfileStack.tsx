import React from 'react';
import {navigationOptions} from './index';
import ProfileScreen from '@screens/profile';
import SettingsScreen from '@screens/settings';
import FamiliesScreen from '@screens/families';
import {ScreenName} from '@constants/Constants';
import CameraScreen from '@screens/media/CameraScreen';
import MyChoresScreen from '@screens/chores/MyChoresScreen';
import MyEventsScreen from '@screens/events/MyEventsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LanguageScreen from '@screens/settings/LanguageScreen';
import MediaPickerScreen from '@screens/media/MediaPickerScreen';
import QRPresenterScreen from '@screens/families/QRPresenterScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import UpdateProfileScreen from '@screens/profile/UpdateProfileScreen';
import ScanFamilyQRScreen from '@screens/families/ScanFamilyQRScreen';
import UpdatePasswordScreen from '@screens/settings/UpdatePasswordScreen';
import AlbumsScreen from '@screens/albums';
import AlbumDetailScreen from '@screens/albums/AlbumDetailScreen';
import FamilyDetailScreen from '@screens/families/FamilyDetailScreen';

interface Props {
  route?: any;
  navigation?: any;
}

const hiddenRouteNames: string[] = [
  ScreenName.CameraScreen,
  ScreenName.MediaPickerScreen,
];

const Stack = createStackNavigator();

const ProfileStack: React.FC<Props> = ({navigation, route}) => {
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
      <Stack.Screen name={ScreenName.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={'CameraScreen'} component={CameraScreen} />
      <Stack.Screen
        name={ScreenName.MediaPickerScreen}
        component={MediaPickerScreen}
      />
      <Stack.Screen
        name={ScreenName.MyChoresScreen}
        component={MyChoresScreen}
      />
      <Stack.Screen
        name={ScreenName.MyEventsScreen}
        component={MyEventsScreen}
      />
      <Stack.Screen
        name={ScreenName.FamiliesScreen}
        component={FamiliesScreen}
      />
      <Stack.Screen
        name={ScreenName.FamilyDetailScreen}
        component={FamilyDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.QRPresenterScreen}
        component={QRPresenterScreen}
      />
      <Stack.Screen
        name={ScreenName.ScanFamilyQRScreen}
        component={ScanFamilyQRScreen}
      />
      <Stack.Screen
        name={ScreenName.SettingsScreen}
        component={SettingsScreen}
      />
      <Stack.Screen
        name={ScreenName.LanguageScreen}
        component={LanguageScreen}
      />
      <Stack.Screen
        name={ScreenName.UpdatePasswordScreen}
        component={UpdatePasswordScreen}
      />
      <Stack.Screen
        name={ScreenName.UpdateProfileScreen}
        component={UpdateProfileScreen}
      />
      <Stack.Screen name={ScreenName.AlbumsScreen} component={AlbumsScreen} />
      <Stack.Screen
        name={ScreenName.AlbumDetailScreen}
        component={AlbumDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
