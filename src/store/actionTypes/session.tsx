import {SessionState} from '@store/reducers/session';
import {ToastType} from '@constants/types/session';

//
// Refresh Control
//
export const UPDATE_IS_REFRESHING_PROFILE = 'UPDATE_IS_REFRESHING_PROFILE';
export const updateIsRefreshingProfileAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_PROFILE,
  payload,
});
export const UPDATE_IS_REFRESHING_FAMILIES = 'UPDATE_IS_REFRESHING_FAMILIES';
export const updateIsRefreshingFamiliesAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_FAMILIES,
  payload,
});
export const UPDATE_IS_REFRESHING_FAMILY_DETAIL =
  'UPDATE_IS_REFRESHING_FAMILY_DETAIL';
export const updateIsRefreshingFamilyDetailAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_FAMILY_DETAIL,
  payload,
});
export const UPDATE_IS_REFRESHING_FAMILY_MEMBERS =
  'UPDATE_IS_REFRESHING_FAMILY_MEMBERS';
export const updateIsRefreshingFamilyMembersAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_FAMILY_MEMBERS,
  payload,
});
export const UPDATE_IS_REFRESHING_ALBUMS = 'UPDATE_IS_REFRESHING_ALBUMS';
export const updateIsRefreshingAlbumsAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_ALBUMS,
  payload,
});
export const UPDATE_IS_REFRESHING_PHOTOS = 'UPDATE_IS_REFRESHING_PHOTOS';
export const updateIsRefreshingPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_PHOTOS,
  payload,
});
export const UPDATE_IS_REFRESHING_CHORES = 'UPDATE_IS_REFRESHING_CHORES';
export const updateIsRefreshingChoresAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_CHORES,
  payload,
});
export const UPDATE_IS_REFRESHING_CHORE_PHOTOS =
  'UPDATE_IS_REFRESHING_CHORE_PHOTOS';
export const updateIsRefreshingChorePhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_CHORE_PHOTOS,
  payload,
});
export const UPDATE_IS_REFRESHING_EVENTS = 'UPDATE_IS_REFRESHING_EVENTS';
export const updateIsRefreshingEventsAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_EVENTS,
  payload,
});
export const UPDATE_IS_REFRESHING_EVENT_PHOTOS =
  'UPDATE_IS_REFRESHING_EVENT_PHOTOS';
export const updateIsRefreshingEventPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_EVENT_PHOTOS,
  payload,
});

export const UPDATE_IS_REFRESHING_DATES_CONTAIN_EVENTS =
  'UPDATE_IS_REFRESHING_DATES_CONTAIN_EVENTS';
export const updateIsRefreshingDatesContainEventsAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_REFRESHING_DATES_CONTAIN_EVENTS,
  payload,
});

//
// Load More
//
export const UPDATE_IS_LOADING_FAMILIES = 'UPDATE_IS_LOADING_FAMILIES';
export const updateIsLoadingFamiliesAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_FAMILIES,
  payload,
});
export const UPDATE_IS_LOADING_FAMILY_MEMBERS =
  'UPDATE_IS_LOADING_FAMILY_MEMBERS';
export const updateIsLoadingFamilyMembersAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_FAMILY_MEMBERS,
  payload,
});
export const UPDATE_IS_LOADING_ALBUMS = 'UPDATE_IS_LOADING_ALBUMS';
export const updateIsLoadingAlbumsAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_ALBUMS,
  payload,
});
export const UPDATE_IS_LOADING_PHOTOS = 'UPDATE_IS_LOADING_PHOTOS';
export const updateIsLoadingPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_PHOTOS,
  payload,
});
export const UPDATE_IS_LOADING_CHORES = 'UPDATE_IS_LOADING_CHORES';
export const updateIsLoadingChoresAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_CHORES,
  payload,
});
export const UPDATE_IS_LOADING_CHORE_PHOTOS = 'UPDATE_IS_LOADING_CHORE_PHOTOS';
export const updateIsLoadingChorePhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_CHORE_PHOTOS,
  payload,
});
export const UPDATE_IS_LOADING_EVENTS = 'UPDATE_IS_LOADING_EVENTS';
export const updateIsLoadingEventsAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_EVENTS,
  payload,
});
export const UPDATE_IS_LOADING_EVENT_PHOTOS = 'UPDATE_IS_LOADING_EVENT_PHOTOS';
export const updateIsLoadingEventPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_EVENT_PHOTOS,
  payload,
});

// HUD
export const SHOW_HUD = 'SHOW_HUD';
export const showHUDAction = () => ({
  type: SHOW_HUD,
});

export const CLOSE_HUD = 'CLOSE_HUD';
export const closeHUDAction = () => ({
  type: CLOSE_HUD,
});

export const TURN_ON_REFRESHING_TOKEN = 'TURN_ON_REFRESHING_TOKEN';
export const turnOnIsRefreshingTokenAction = () => ({
  type: TURN_ON_REFRESHING_TOKEN,
});

export const TURN_OFF_REFRESHING_TOKEN = 'TURN_OFF_REFRESHING_TOKEN';
export const turnOffIsRefreshingTokenAction = () => ({
  type: TURN_OFF_REFRESHING_TOKEN,
});

export const CLEAR_SESSION = 'CLEAR_SESSION';
export const clearSessionAction = () => ({
  type: CLEAR_SESSION,
});

// Toast
export const SHOW_TOAST = 'SHOW_TOAST';
export const showToastAction = (
  toastMessage: string,
  toastType: ToastType,
) => ({
  type: SHOW_TOAST,
  toastMessage,
  toastType: toastType,
});

export const CLOSE_TOAST = 'CLOSE_TOAST';
export const closeToastAction = (toastId: number) => ({
  type: CLOSE_TOAST,
  toastId,
});
