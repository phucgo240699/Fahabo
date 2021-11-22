import React, {useEffect} from 'react';
import BottomTabs from './BottomTabs';
import {navigate, navigationOptions} from './index';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ScreenName} from '@constants/Constants';
import messaging from '@react-native-firebase/messaging';
import ImageViewerScreen from '@screens/media/ImageViewerScreen';
import {useDispatch} from 'react-redux';
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

const Stack = createStackNavigator();

const MainStack = () => {
  const dispatch = useDispatch();

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
