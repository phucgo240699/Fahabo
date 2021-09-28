import {SessionState} from '@store/reducers/session';
import {ToastType} from '@constants/types/session';

// Redux
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const updateSessionAction = (session: SessionState) => ({
  type: UPDATE_SESSION,
  session,
});

export const CLEAR_SESSION = 'CLEAR_SESSION';
export const clearSessionAction = () => ({
  type: CLEAR_SESSION,
});

// Toast
export const ADD_TOAST = 'ADD_TOAST';
export const addToastAction = (toastMessage: string, type?: ToastType) => ({
  type: ADD_TOAST,
  toastMessage,
  toastType: type ?? ToastType.ERROR,
});
