export const SHOW_RESET_PASSWORD_LINK_MODAL = 'SHOW_RESET_PASSWORD_LINK_MODAL';
export const showResetPasswordLinkModalAction = (payload: string) => ({
  type: SHOW_RESET_PASSWORD_LINK_MODAL,
  payload,
});

export const CLOSE_RESET_PASSWORD_LINK_MODAL =
  'CLOSE_RESET_PASSWORD_LINK_MODAL';
export const closeResetPasswordLinkModalAction = () => ({
  type: CLOSE_RESET_PASSWORD_LINK_MODAL,
});
