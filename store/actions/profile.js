/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { createAction } from 'redux-actions';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {getMethod, postMethod, putMethod} from '../../utils/api';
import {apiConfig} from '../../config/config';

import {
  GET_USER_START,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_PROFILE_START,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CREATE_PROFILE_START,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from '../action_types';
import {getUserId} from './selector';
import {toastUpdate} from './layout';

export const getUserStart = createAction(GET_USER_START);
export const getUserRequest = createAction(GET_USER_REQUEST);
export const getUserSuccess = createAction(GET_USER_SUCCESS);
export const getUserFailure = createAction(GET_USER_FAILURE);

export const updateUserStart = createAction(UPDATE_USER_START);
export const updateUserRequest = createAction(UPDATE_USER_REQUEST);
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS);
export const updateUserFailure = createAction(UPDATE_USER_FAILURE);

export const getProfileStart = createAction(GET_PROFILE_START);
export const getProfileRequest = createAction(GET_PROFILE_REQUEST);
export const getProfileSuccess = createAction(GET_PROFILE_SUCCESS);
export const getProfileFailure = createAction(GET_PROFILE_FAILURE);

export const createProfileStart = createAction(CREATE_PROFILE_START);
export const createProfileRequest = createAction(CREATE_PROFILE_REQUEST);
export const createProfileSuccess = createAction(CREATE_PROFILE_SUCCESS);
export const createProfileFailure = createAction(CREATE_PROFILE_FAILURE);

export const updateProfileStart = createAction(UPDATE_PROFILE_START);
export const updateProfileRequest = createAction(UPDATE_PROFILE_REQUEST);
export const updateProfileSuccess = createAction(UPDATE_PROFILE_SUCCESS);
export const updateProfileFailure = createAction(UPDATE_PROFILE_FAILURE);

function* getUser() {
  yield put(getUserRequest());
  try {
    const userId = yield select(getUserId);
    const {response, error} = yield call(getMethod, `${apiConfig('v1')}/user/${userId}`);
    if (response) {
      if (response.data.metadata.success) {
        yield put(getUserSuccess(response.data.resultset.content[0]));
      }
      else {
        yield put(getUserFailure('error'));
        yield put(toastUpdate({
          show: true,
          type: 'error',
          content: {
            title: `Error code ${response.status}`,
            description: `Error code ${response.status}`
          },
          interval: 5000
        }))
      }
    }
    if (error) {
      yield put(getUserFailure(error));
      yield put(toastUpdate({
        show: true,
        type: 'error',
        content: {
          title: `Error`,
          description: JSON.stringify(error)
        },
        interval: 5000
      }))
    }
  }
  catch (error) {
    yield put(getUserFailure(error));
    yield put(toastUpdate({
      show: true,
      type: 'error',
      content: {
        title: `Error`,
        description: JSON.stringify(error)
      },
      interval: 5000
    }))
  }
}

function* updateUser(reqData) {
  yield put(updateUserRequest());
  try {
    const {response, error} = yield call(putMethod, `${apiConfig('v1')}/user`, reqData.payload);
    if (response) {
      if (response.data.metadata.success) {
        yield put(updateUserSuccess(response.data.resultset.content[0]));
      }
      else {
        yield put(updateUserFailure('error'));
      }
    }
    if (error) {
      yield put(updateUserFailure(error));
    }
  }
  catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* createProfile(reqData) {
  yield put(createProfileRequest());
  try {
    const {response, error} = yield call(postMethod, `${apiConfig('v1')}/profile`, reqData.payload);
    if (response) {
      if (response.data.metadata.success) {
        yield put(createProfileSuccess(response.data.resultset.content[0]));
      }
      else {
        yield put(createProfileFailure('error'));
      }
    }
    if (error) {
      yield put(createProfileFailure(error));
    }
  }
  catch (error) {
    yield put(createProfileFailure(error));
  }
}

function* getProfile() {
  yield put(getProfileRequest());
  try {
    const userId = window.localStorage.getItem('authData').split('----')[1];
    const {response, error} = yield call(getMethod, `${apiConfig('v1')}/user/${userId}`);
    if (response) {
      if (response.data.success) {
        yield put(getProfileSuccess({response}));
      }
      else {
        yield put(getProfileFailure('error'));
      }
    }
    if (error) {
      yield put(getProfileFailure(error));
    }
  }
  catch (error) {
    yield put(getProfileFailure(error));
  }
}

function* updateProfile(reqData) {
  yield put(updateProfileRequest());
  try {
    const {response, error} = yield call(putMethod, `${apiConfig('v1')}/profile`, reqData.payload);
    if (response) {
      if (response.data.metadata.success) {
        yield put(updateProfileSuccess(response.data.resultset.content[0]));
        yield put(toastUpdate({
          show: true,
          type: 'success',
          content: {
            title: `Success`,
            description: `Updated successfully`
          },
          interval: 5000
        }))
      }
      else {
        yield put(updateProfileFailure('error'));
      }
    }
    if (error) {
      yield put(updateProfileFailure(error));
    }
  }
  catch (error) {
    yield put(updateProfileFailure(error));
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER_START, getUser)
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER_START, updateUser)
}

export function* watchCreateProfile() {
  yield takeEvery(CREATE_PROFILE_START, createProfile)
}

export function* watchGetProfile() {
  yield takeEvery(GET_PROFILE_START, getProfile)
}

export function* watchUpdateProfile() {
  yield takeEvery(UPDATE_PROFILE_START, updateProfile)
}