import {SessionState} from '@store/reducers/session';
import {ToastType} from '@constants/types/session';

// HUD
export const SHOW_HUD = 'SHOW_HUD';
export const showHUDAction = () => ({
  type: SHOW_HUD,
});

export const CLOSE_HUD = 'CLOSE_HUD';
export const closeHUDAction = () => ({
  type: CLOSE_HUD,
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
