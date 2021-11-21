import React from 'react';
import colors from '@themes/colors';
import {StackName} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import HomeStack from './HomeStack';
import FamilyStack from './FamilyStack';
import ProfileStack from './ProfileStack';
import NotificationsStack from './NotificationsStack';
import InteractionsStack from './InteractionsStack';
import {
  homeIcon,
  selectedHomeIcon,
  notificationsIcon,
  selectedNotificationsIcon,
  interactionsIcon,
  selectedInteractionsIcon,
  profileIcon,
  selectedProfileIcon,
  selectedFamilyIcon,
  familyIcon,
} from '@constants/sources/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {
  interactionBadgeSelector,
  notificationBadgeSelector,
} from '@store/selectors/notifications';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {isNull} from '@utils/index';
import {focusFamilySelector} from '@store/selectors/family';
import {
  clearInteractionBadgeRequestAction,
  clearNotificationBadgeRequestAction,
  getBadgesRequestAction,
} from '@store/actionTypes/notifications';
import {updateRouteNameAction} from '@store/actionTypes/session';
import messaging from '@react-native-firebase/messaging';

interface Props {
  route?: any;
  navigation?: any;
}

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const interactionBadge = useSelector(interactionBadgeSelector);
  const notificationBadge = useSelector(notificationBadgeSelector);

  // Clear & Adapt Badge
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    switch (routeName) {
      case StackName.HomeStack:
        dispatch(updateRouteNameAction(StackName.HomeStack));
        if (!isNull(focusFamily?.id)) {
          dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
        }
        break;
      case StackName.InteractionsStack:
        if (!isNull(focusFamily?.id)) {
          dispatch(
            clearInteractionBadgeRequestAction({familyId: focusFamily?.id}),
          );
          dispatch(
            getBadgesRequestAction({
              familyId: focusFamily?.id,
              onlyNotification: true,
            }),
          );
        }
        break;
      case StackName.FamilyStack:
        dispatch(updateRouteNameAction(StackName.FamilyStack));
        if (!isNull(focusFamily?.id)) {
          dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
        }
        break;
      case StackName.NotificationsStack:
        if (!isNull(focusFamily?.id)) {
          dispatch(clearNotificationBadgeRequestAction());
          dispatch(
            getBadgesRequestAction({
              familyId: focusFamily?.id,
              onlyInteraction: true,
            }),
          );
        }
        break;
      case StackName.ProfileStack:
        dispatch(updateRouteNameAction(StackName.ProfileStack));
        if (!isNull(focusFamily?.id)) {
          dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
        }
        break;
      default:
        break;
    }
  }, [navigation, route]);

  React.useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // Foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log({Foreground: remoteMessage});
      console.log('focusFamily?.id', focusFamily?.id);
      if (!isNull(focusFamily?.id)) {
        console.log({routeName});
        switch (routeName) {
          case StackName.InteractionsStack:
            dispatch(
              getBadgesRequestAction({
                familyId: focusFamily?.id,
                onlyNotification: true,
              }),
            );
            break;
          case StackName.NotificationsStack:
            dispatch(
              getBadgesRequestAction({
                familyId: focusFamily?.id,
                onlyInteraction: true,
              }),
            );
          default:
            dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
            break;
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: colors.WHITE},
        tabBarIcon: ({focused, size}) => {
          let iconSource = homeIcon;
          let tintColor = colors.THEME_COLOR_5;
          switch (route.name) {
            case StackName.HomeStack:
              iconSource = focused ? selectedHomeIcon : homeIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.InteractionsStack:
              iconSource = focused
                ? selectedInteractionsIcon
                : interactionsIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.FamilyStack:
              iconSource = focused ? selectedFamilyIcon : familyIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.NotificationsStack:
              iconSource = focused
                ? selectedNotificationsIcon
                : notificationsIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            case StackName.ProfileStack:
              iconSource = focused ? selectedProfileIcon : profileIcon;
              tintColor = focused ? colors.THEME_COLOR_5 : colors.SILVER;
              break;
            default:
              break;
          }
          return (
            <PrimaryIcon
              width={size}
              height={size}
              tintColor={tintColor}
              source={iconSource}
            />
          );
        },
        tabBarLabel: () => <></>,
      })}>
      <Tab.Screen
        name={StackName.HomeStack}
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={StackName.InteractionsStack}
        component={InteractionsStack}
        options={{
          headerShown: false,
          tabBarBadge: interactionBadge === 0 ? undefined : interactionBadge,
        }}
      />
      <Tab.Screen
        name={StackName.FamilyStack}
        component={FamilyStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={StackName.NotificationsStack}
        component={NotificationsStack}
        options={{
          headerShown: false,
          tabBarBadge: notificationBadge === 0 ? undefined : notificationBadge,
        }}
      />
      <Tab.Screen
        name={StackName.ProfileStack}
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
