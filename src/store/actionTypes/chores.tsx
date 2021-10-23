import {
  ChoreType,
  CreateChoreRequestType,
  DeleteChoreRequestType,
  GetChorePhotosRequestType,
  GetChoresRequestType,
  UpdateChoreRequestType,
} from '@constants/types/chores';

// Create
export const CREATE_CHORE_REQUEST = 'CREATE_CHORE_REQUEST';
export const createChoreRequestAction = (body: CreateChoreRequestType) => ({
  type: CREATE_CHORE_REQUEST,
  body,
});
export const CREATE_CHORE_SUCCESS = 'CREATE_CHORE_SUCCESS';
export const createChoreSuccessAction = (payload: ChoreType) => ({
  type: CREATE_CHORE_SUCCESS,
  payload,
});

// Update
export const UPDATE_CHORE_REQUEST = 'CREATE_CHORE_REQUEST';
export const updateChoreRequestAction = (body: UpdateChoreRequestType) => ({
  type: CREATE_CHORE_REQUEST,
  body,
});
export const UPDATE_CHORE_SUCCESS = 'UPDATE_CHORE_SUCCESS';
export const updateChoreSuccessAction = (payload: ChoreType) => ({
  type: UPDATE_CHORE_SUCCESS,
  payload,
});

// Delete
export const DELETE_CHORE_REQUEST = 'CREATE_CHORE_REQUEST';
export const deleteChoreRequestAction = (body: DeleteChoreRequestType) => ({
  type: CREATE_CHORE_REQUEST,
  body,
});
export const DELETE_CHORE_SUCCESS = 'UPDATE_CHORE_SUCCESS';
export const deleteChoreSuccessAction = (payload: ChoreType) => ({
  type: UPDATE_CHORE_SUCCESS,
  payload,
});

// Get Chores
export const GET_CHORES_REQUEST = 'GET_CHORES_REQUEST';
export const getChoresRequestAction = (body: GetChoresRequestType) => ({
  type: GET_CHORES_REQUEST,
  body,
});
export const GET_CHORES_SUCCESS = 'GET_CHORES_SUCCESS';
export const getChoresSuccessAction = (payload: ChoreType[]) => ({
  type: GET_CHORES_SUCCESS,
  payload,
});

// Get Chore Photos
export const GET_CHORE_PHOTOS_REQUEST = 'GET_CHORE_PHOTOS_REQUEST';
export const getChorePhotosRequestAction = (
  body: GetChorePhotosRequestType,
) => ({
  type: GET_CHORE_PHOTOS_REQUEST,
  body,
});
export const GET_CHORE_PHOTOS_SUCCESS = 'GET_CHORE_PHOTOS_SUCCESS';
export const getChorePhotosSuccessAction = (payload: ChoreType[]) => ({
  type: GET_CHORE_PHOTOS_SUCCESS,
  payload,
});
