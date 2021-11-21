import {NotificationType} from '@constants/types/notifications';
import {
  CLEAR_INTERACTION_BADGE_SUCCESS,
  CLEAR_NOTIFICATION_BADGE_SUCCESS,
  CLICK_NOTIFICATION_SUCCESS,
  GET_BADGES_SUCCESS,
  GET_INTERACTION_BADGE_SUCCESS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATION_BADGE_SUCCESS,
  UPDATE_IS_GETTING_NOTIFICATIONS,
  UPDATE_IS_LOADING_MORE_NOTIFICATIONS,
  UPDATE_IS_REFRESHING_NOTIFICATIONS,
} from '@store/actionTypes/notifications';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type NotificationsState = {
  isGetting: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  notifications: NotificationType[];
  interactionBadge: number;
  notificationBadge: number;
};

const defaultState: NotificationsState = {
  isGetting: false,
  isRefreshing: false,
  isLoadingMore: false,
  notifications: [],
  interactionBadge: 0,
  notificationBadge: 0,
};

export default function notificationsReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      };
    case GET_BADGES_SUCCESS:
      return {
        ...state,
        interactionBadge: action.payload.countChat,
        notificationBadge: action.payload.countNoti,
      };
    case GET_INTERACTION_BADGE_SUCCESS:
      return {
        ...state,
        interactionBadge: action.payload,
      };
    case GET_NOTIFICATION_BADGE_SUCCESS:
      return {
        ...state,
        notificationBadge: action.payload,
      };
    case CLEAR_NOTIFICATION_BADGE_SUCCESS:
      return {
        ...state,
        notificationBadge: 0,
      };
    case CLEAR_INTERACTION_BADGE_SUCCESS:
      return {
        ...state,
        interactionBadge: 0,
      };
    case CLICK_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              isClicked: true,
            };
          } else {
            return item;
          }
        }),
      };
    case UPDATE_IS_GETTING_NOTIFICATIONS:
      return {
        ...state,
        isGetting: action.payload,
      };
    case UPDATE_IS_REFRESHING_NOTIFICATIONS:
      return {
        ...state,
        isRefreshing: action.payload,
      };
    case UPDATE_IS_LOADING_MORE_NOTIFICATIONS:
      return {
        ...state,
        isLoadingMore: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isGetting: false,
        isRefreshing: false,
        isLoadingMore: false,
        notifications: [],
        interactionBadge: 0,
        notificationBadge: 0,
      };
    default:
      return state;
  }
}
