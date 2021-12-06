import React, {useEffect} from 'react';
import BottomTabs from './BottomTabs';
import {navigationOptions} from './index';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {ScreenName} from '@constants/Constants';
import messaging from '@react-native-firebase/messaging';
import ImageViewerScreen from '@screens/media/ImageViewerScreen';
import {useDispatch} from 'react-redux';
import {addFCMTokenRequestAction} from '@store/actionTypes/signIn';
// import {isNull} from '@utils/index';
// import {NotificationNavigationType} from '@constants/types/modals';
// import {getChoreDetailRequestAction} from '@store/actionTypes/chores';
// import {getEventDetailRequestAction} from '@store/actionTypes/events';
// import {getFamilyDetailRequestAction} from '@store/actionTypes/family';
import FamilyDetailScreen from '@screens/families/FamilyDetailScreen';
import EventDetailScreen from '@screens/events/EventDetailScreen';
import ChoreDetailScreen from '@screens/chores/ChoreDetailScreen';
import ChorePhotosScreen from '@screens/chores/ChorePhotosScreen';
import EventPhotosScreen from '@screens/events/EventPhotosScreen';
// import {connectTwilioRequestActions} from '@store/actionTypes/interactions';
import ConferenceCallScreen from '@screens/interactions/ConferenceCallScreen';
import LocationsScreen from '@screens/locations';
import TransactionDetailScreen from '@screens/transactions/TransactionDetailScreen';
import TransactionPhotosScreen from '@screens/transactions/TransactionPhotosScreen';
// import {focusFamilySelector} from '@store/selectors/family';
// import {
//   clearInteractionBadgeRequestAction,
//   clearNotificationBadgeRequestAction,
//   getBadgesRequestAction,
//   getNotificationsRequestAction,
// } from '@store/actionTypes/notifications';
// import {useRoute} from '@react-navigation/native';
// import {routeNameSelector} from '@store/selectors/session';

interface Props {
  route?: any;
  navigation?: any;
}

const Stack = createStackNavigator();

const MainStack = () => {
  const dispatch = useDispatch();
  // const routeName = useSelector(routeNameSelector);
  // const focusFamily = useSelector(focusFamilySelector);

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
        name={ScreenName.EventPhotosScreen}
        component={EventPhotosScreen}
      />
      <Stack.Screen
        name={ScreenName.TransactionDetailScreen}
        component={TransactionDetailScreen}
      />
      <Stack.Screen
        name={ScreenName.TransactionPhotosScreen}
        component={TransactionPhotosScreen}
      />
      <Stack.Screen
        name={ScreenName.ConferenceCallScreen}
        component={ConferenceCallScreen}
      />
      <Stack.Screen
        name={ScreenName.LocationsScreen}
        component={LocationsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
