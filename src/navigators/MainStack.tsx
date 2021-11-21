import React, {useEffect, useLayoutEffect} from 'react';
import BottomTabs from './BottomTabs';
import {navigationOptions} from './index';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ScreenName, StackName} from '@constants/Constants';
import messaging from '@react-native-firebase/messaging';
import ImageViewerScreen from '@screens/media/ImageViewerScreen';
import {useDispatch, useSelector} from 'react-redux';
import {addFCMTokenRequestAction} from '@store/actionTypes/signIn';
import {isNull} from '@utils/index';
import {NotificationNavigationType} from '@constants/types/modals';
import {getChoreDetailRequestAction} from '@store/actionTypes/chores';
import {getEventDetailRequestAction} from '@store/actionTypes/events';
import {getFamilyDetailRequestAction} from '@store/actionTypes/family';
import FamilyDetailScreen from '@screens/families/FamilyDetailScreen';
import EventDetailScreen from '@screens/events/EventDetailScreen';
import ChoreDetailScreen from '@screens/chores/ChoreDetailScreen';
import ChorePhotosScreen from '@screens/chores/ChorePhotosScreen';
import EventPhotosScreen from '@screens/events/EventPhotosScreen';
import {connectTwilioRequestActions} from '@store/actionTypes/interactions';
import ConferenceCallScreen from '@screens/interactions/ConferenceCallScreen';
import {getBadgesRequestAction} from '@store/actionTypes/notifications';
import {focusFamilySelector} from '@store/selectors/family';
import {routeNameSelector} from '@store/selectors/session';
import {Alert} from 'react-native';

interface Props {
  route?: any;
  navigation?: any;
}

const Stack = createStackNavigator();

const MainStack: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const routeName = useSelector(routeNameSelector);

  // useLayoutEffect(() => {
  //   if (!isNull(focusFamily?.id)) {
  //     console.log({routeName});
  //     switch (routeName) {
  //       case StackName.InteractionsStack:
  //         dispatch(
  //           getBadgesRequestAction({
  //             familyId: focusFamily?.id,
  //             onlyNotification: true,
  //           }),
  //         );
  //         break;
  //       case StackName.NotificationsStack:
  //         dispatch(
  //           getBadgesRequestAction({
  //             familyId: focusFamily?.id,
  //             onlyInteraction: true,
  //           }),
  //         );
  //       default:
  //         dispatch(getBadgesRequestAction({familyId: focusFamily?.id}));
  //         break;
  //     }
  //   }
  // }, []);

  useEffect(() => {
    messaging()
      .requestPermission()
      .then(authStatus => {
        if (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          messaging()
            .getToken()
            .then(token => {
              dispatch(addFCMTokenRequestAction({firebaseToken: token}));
            });
        }
      });
  }, []);

  useEffect(() => {
    // Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log({Background: remoteMessage});
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
        console.log({Quit: remoteMessage});
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
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen
        name={ScreenName.ImageViewerScreen}
        component={ImageViewerScreen}
        options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={ScreenName.FamilyDetailScreen}
        component={FamilyDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.ChoreDetailScreen}
        component={ChoreDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.ChorePhotosScreen}
        component={ChorePhotosScreen}
      />
      <Stack.Screen
        name={ScreenName.EventDetailScreen}
        component={EventDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.ConferenceCallScreen}
        component={ConferenceCallScreen}
      />
      <Stack.Screen
        name={ScreenName.EventPhotosScreen}
        component={EventPhotosScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
