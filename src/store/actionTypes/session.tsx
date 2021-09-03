import {SessionState} from '@store/reducers/session';

// Redux
export const UPDATE_SESSION = 'UPDATE_SESSION';
export const updateSessionAction = (session: SessionState) => ({
  type: UPDATE_SESSION,
  session,
});
