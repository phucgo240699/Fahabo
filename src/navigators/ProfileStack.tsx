import React from 'react';
import {navigationOptions} from './index';
import ProfileScreen from '@screens/profile';
import SettingsScreen from '@screens/settings';
import {ScreenName} from '@constants/Constants';
import CameraScreen from '@screens/media/CameraScreen';
import MyChoresScreen from '@screens/chores/MyChoresScreen';
import MyEventsScreen from '@screens/events/MyEventsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LanguageScreen from '@screens/settings/LanguageScreen';
import MediaPickerScreen from '@screens/media/MediaPickerScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import UpdateProfileScreen from '@screens/profile/UpdateProfileScreen';
import UpdatePasswordScreen from '@screens/settings/UpdatePasswordScreen';
import MyCuisinePostsScreen from '@screens/profile/MyCuisinePostsScreen';
import MyBookmarkedCuisinePostsScreen from '@screens/profile/MyBookmarkedCuisinePostsScreen';
import CreateCuisinePostScreen from '@screens/cuisine/CreateCuisinePostScreen';
import PreCreateCuisinePostScreen from '@screens/cuisine/PreCreateCuisinePostScreen';

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
      {/* <Stack.Screen name={'CameraScreen'} component={CameraScreen} /> */}
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
      <Stack.Screen
        name={ScreenName.MyCuisinePostsScreen}
        component={MyCuisinePostsScreen}
      />
      <Stack.Screen
        name={ScreenName.MyBookmarkedCuisinePostsScreen}
        component={MyBookmarkedCuisinePostsScreen}
      />
      {/* <Stack.Screen
        name={ScreenName.CreateCuisinePostScreen}
        component={CreateCuisinePostScreen}
      />
      <Stack.Screen
        name={ScreenName.PreCreateCuisinePostScreen}
        component={PreCreateCuisinePostScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
