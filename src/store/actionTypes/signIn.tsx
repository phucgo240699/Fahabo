//
// Sign in
//
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const signInRequest = (payload: {email: string; password: string}) => ({
  type: SIGN_IN_REQUEST,
  payload,
});

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const signInSuccess = (payload: any) => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const signInFail = (error: any) => ({
  type: SIGN_IN_FAIL,
  error,
});
