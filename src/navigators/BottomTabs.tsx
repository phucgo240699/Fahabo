import React, {useEffect} from 'react';
import colors from '@themes/colors';
import {ScreenName, StackName} from '@constants/Constants';
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
  getNotificationsRequestAction,
  handleNotificationInForegroundAction,
} from '@store/actionTypes/notifications';
import messaging from '@react-native-firebase/messaging';
import {updateRouteNameAction} from '@store/actionTypes/session';
import {NotificationNavigationType} from '@constants/types/modals';
import {getChoreDetailRequestAction} from '@store/actionTypes/chores';
import {getEventDetailRequestAction} from '@store/actionTypes/events';
import {getFamilyDetailRequestAction} from '@store/actionTypes/family';
import {navigate} from '.';
import {connectTwilioRequestActions} from '@store/actionTypes/interactions';
import {routeNameSelector} from '@store/selectors/session';

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
  // const routeName = useSelector(routeNameSelector);

  // Clear & Adapt Badge
  React.useLayoutEffect(() => {
    const _routeName = getFocusedRouteNameFromRoute(route);
    switch (_routeName) {
      case StackName.HomeStack:
        dispatch(updateRouteNameAction(StackName.HomeStack));
        // if (!isNull(focusFamily?.id)) {
        //   dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
        // }
        break;
      case StackName.InteractionsStack:
        dispatch(updateRouteNameAction(StackName.InteractionsStack));
        if (!isNull(focusFamily?.id)) {
          dispatch(
            clearInteractionBadgeRequestAction({familyId: focusFamily?.id}),
          );
        }
        break;
      case StackName.FamilyStack:
        dispatch(updateRouteNameAction(StackName.FamilyStack));
        // if (!isNull(focusFamily?.id)) {
        //   dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
        // }
        break;
      case StackName.NotificationsStack:
        dispatch(updateRouteNameAction(StackName.NotificationsStack));
        if (!isNull(focusFamily?.id)) {
          dispatch(clearNotificationBadgeRequestAction());
        }
        break;
      case StackName.ProfileStack:
        dispatch(updateRouteNameAction(StackName.ProfileStack));
        // if (!isNull(focusFamily?.id)) {
        //   dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
        // }
        break;
      default:
        break;
    }
  }, [navigation, route]);

  React.useEffect(() => {
    // Foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      dispatch(handleNotificationInForegroundAction());
      // const _routeName = getFocusedRouteNameFromRoute(route);
      // console.log({Foreground: remoteMessage});
      // console.log({_routeName});
      // if (!isNull(focusFamily?.id)) {
      //   switch (_routeName) {
      //     case StackName.InteractionsStack:
      //       dispatch(
      //         clearInteractionBadgeRequestAction({familyId: focusFamily?.id}),
      //       );
      //       dispatch(
      //         getBadgesRequestAction({
      //           familyId: focusFamily?.id,
      //           onlyNotification: true,
      //         }),
      //       );
      //       break;
      //     case StackName.NotificationsStack:
      //       dispatch(clearNotificationBadgeRequestAction());
      //       dispatch(
      //         getBadgesRequestAction({
      //           familyId: focusFamily?.id,
      //           onlyInteraction: true,
      //         }),
      //       );
      //       dispatch(getNotificationsRequestAction({getting: true}));
      //       break;
      //     default:
      //       dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
      //       break;
      //   }
      // }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (
        !isNull(remoteMessage?.data?.navigate) &&
        !isNull(remoteMessage?.data?.id)
      ) {
        onDirectScreen(
          remoteMessage?.data?.navigate,
          remoteMessage?.data?.id,
          remoteMessage?.data?.familyId,
        );
      }
    });

    // Quit
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (
          !isNull(remoteMessage?.data?.navigate) &&
          !isNull(remoteMessage?.data?.id)
        ) {
          onDirectScreen(
            remoteMessage?.data?.navigate,
            remoteMessage?.data?.id,
          );
        }
      });
  }, []);

  const onDirectScreen = (value?: string, id?: string, familyId?: string) => {
    switch (value) {
      case NotificationNavigationType.CHORE_DETAIL:
        dispatch(
          getChoreDetailRequestAction({
            choreId: parseInt(id ?? ''),
          }),
        );
        break;
      case NotificationNavigationType.EVENT_DETAIL:
        dispatch(
          getEventDetailRequestAction({
            eventId: parseInt(id ?? ''),
          }),
        );
        break;
      case NotificationNavigationType.FAMILY_DETAIL:
        dispatch(
          getFamilyDetailRequestAction({
            familyId: parseInt(id ?? ''),
          }),
        );
        break;
      case NotificationNavigationType.CHAT:
        navigate(ScreenName.InteractionsScreen);
        break;
      case NotificationNavigationType.VIDEO_CALL:
        dispatch(
          connectTwilioRequestActions({
            familyId: parseInt(familyId ?? ''),
            roomCallId: id,
          }),
        );
      default:
        break;
    }
  };

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
