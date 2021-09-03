//
// Sign up
//
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const signUpRequest = (payload: {email: string; password: string}) => ({
  type: SIGN_UP_REQUEST,
  payload,
});

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const signUpSuccess = (payload: any) => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';
export const signUpFail = (error: any) => ({
  type: SIGN_UP_FAIL,
  error,
});
