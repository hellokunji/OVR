/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {createAction} from 'redux-actions';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {getMethod, postMethod, putMethod} from '../../utils/api';
import {apiConfig} from '../../config/config';
import {
  GET_EXPLORE_DATA_START,
  GET_EXPLORE_DATA_REQUEST,
  GET_EXPLORE_DATA_SUCCESS,
  GET_EXPLORE_DATA_FAILURE,
  SET_EXPLORE_DATA_START,
  SET_EXPLORE_DATA_REQUEST,
  SET_EXPLORE_DATA_SUCCESS,
  SET_EXPLORE_DATA_FAILURE,
  SEARCH_PROFILES_START,
  SEARCH_PROFILES_REQUEST,
  SEARCH_PROFILES_SUCCESS,
  SEARCH_PROFILES_FAILURE,
  SET_EXPLORE_VIEWED,
  SET_EXPLORE_UNVIEWED,

  RESET_EXPLORE
} from '../action_types';
import {isDataValid} from '../../utils/helpers';
import {isScreeningComplete} from '../../utils/validation';
import {getPreference, getUsageRole} from './selector';

export const getExploreDataStart = createAction(GET_EXPLORE_DATA_START);
export const getExploreDataRequest = createAction(GET_EXPLORE_DATA_REQUEST);
export const getExploreDataSuccess = createAction(GET_EXPLORE_DATA_SUCCESS);
export const getExploreDataFailure = createAction(GET_EXPLORE_DATA_FAILURE);

export const setExploreDataStart = createAction(SET_EXPLORE_DATA_START);
export const setExploreDataRequest = createAction(SET_EXPLORE_DATA_REQUEST);
export const setExploreDataSuccess = createAction(SET_EXPLORE_DATA_SUCCESS);
export const setExploreDataFailure = createAction(SET_EXPLORE_DATA_FAILURE);

export const searchProfilesStart = createAction(SEARCH_PROFILES_START);
export const searchProfilesRequest = createAction(SEARCH_PROFILES_REQUEST);
export const searchProfilesSuccess = createAction(SEARCH_PROFILES_SUCCESS);
export const searchProfilesFailure = createAction(SEARCH_PROFILES_FAILURE);

export const setExploreViewed = createAction(SET_EXPLORE_VIEWED);
export const setExploreUnViewed = createAction(SET_EXPLORE_UNVIEWED);

export const resetExplore = createAction(RESET_EXPLORE);

// GET EXPLORE DATA
function* getExploreData(reqData) {
  yield put(getExploreDataRequest());
  try {
    let requestUrl = `${apiConfig('v1')}/profile/search/latest`;
    requestUrl += `?offset=${reqData.payload.offset}&limit=${reqData.payload.limit}&profile_id=${reqData.payload.profileId}`;
    let usageRole = yield select(getUsageRole);
    if (usageRole.toLowerCase() === 'teacher') {
      let preference = yield select(getPreference);
      if (isScreeningComplete(preference)) {
        //requestUrl += '&';
        Object.keys(preference).forEach((key, index) => {
          if (preference[key] === false) {
            requestUrl += '&';
            requestUrl += `${key}=${preference[key]}`;
            //if (size - 1 > index) requestUrl += '&';
          }
        });
      }
    }
    const {response, error} = yield call(getMethod, requestUrl);
    if (response) {
      if (response.data.metadata.success) {
        let data = response.data.resultset.content;
        const isFinished = data.length < reqData.payload.limit;
        yield put(getExploreDataSuccess({
          data,
          isFinished,
          offset: isFinished ? reqData.payload.offset : (reqData.payload.offset  + reqData.payload.limit)
        }));
      }
      else {
        yield put(getExploreDataFailure('error'));
      }
    }
    if (error) {
      yield put(getExploreDataFailure(error));
    }
  }
  catch (error) {
    yield put(getExploreDataFailure(error));
  }
}

export function* watchGetExploreData() {
  yield takeEvery(GET_EXPLORE_DATA_START, getExploreData);
}

//SET EXPLORE DATA
function* setExploreData(reqData) {
  //console.log(reqData);
  const userId = reqData.payload.userId;
  yield put(setExploreViewed({userId}));
  yield put(setExploreDataRequest());
  try {
    //let usageRole = yield select(getUsageRole);
    let requestUrl = `${apiConfig('v1')}/profile/view/${userId}`;
    requestUrl += `?action=${reqData.payload.action}&visitor_id=${reqData.payload.visitorId}`;
    const {response, error} = yield call(putMethod, requestUrl);
    if (response) {
      if (response.data.metadata.success) {
        let payload;
        if (isDataValid(response.data.resultset)) {
          payload = response.data.resultset.content[0];
        }
        else {
          payload = null;
        }
        yield put(setExploreDataSuccess(payload));
      }
      else {
        //console.log('unviewed 1');
        yield put(setExploreDataFailure('error'));
        yield put(setExploreUnViewed({userId}));
      }
    }
    if (error) {
      //console.log('unviewed 2');
      yield put(setExploreDataFailure(error));
      yield put(setExploreUnViewed({userId}));
    }
  }
  catch (error) {
    //console.log('unviewed 3');
    yield put(setExploreDataFailure(error));
    yield put(setExploreUnViewed({userId}));
  }
}

export function* watchSetExploreData() {
  yield takeEvery(SET_EXPLORE_DATA_START, setExploreData);
}

// SEARCH PROFILES
function* searchProfiles(reqData) {
  yield put(searchProfilesRequest());
  try {
    //let usageRole = yield select(getUsageRole);
    let requestUrl = `${apiConfig('v1')}/profile/search`;
    const {response, error} = yield call(postMethod, requestUrl, reqData.payload);
    if (response) {
      if (response.data.metadata.success) {
        let data = response.data.resultset.content;
        const isFinished = data.length < reqData.payload.limit;
        yield put(searchProfilesSuccess({
          data,
          isFinished,
          offset: isFinished ? reqData.payload.offset : (reqData.payload.offset  + reqData.payload.limit),
          filter: reqData.payload.filter
        }));
      }
      else {
        yield put(searchProfilesFailure('error'));
      }
    }
    if (error) {
      yield put(searchProfilesFailure(error));
    }
  }
  catch (error) {
    yield put(searchProfilesFailure(error));
  }
}

export function* watchSearchProfiles() {
  yield takeEvery(SEARCH_PROFILES_START, searchProfiles);
}
