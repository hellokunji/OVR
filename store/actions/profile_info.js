/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {createAction} from 'redux-actions';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {getMethod} from '../../utils/api';
import {apiConfig} from '../../config/config';
import {
  GET_PROFILE_INFO_START,
  GET_PROFILE_INFO_REQUEST,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_FAILURE
} from '../action_types';
import {getProfiles} from './selector';
import {isDataValid} from '../../utils/helpers';

export const getProfileInfoStart = createAction(GET_PROFILE_INFO_START);
export const getProfileInfoRequest = createAction(GET_PROFILE_INFO_REQUEST);
export const getProfileInfoSuccess = createAction(GET_PROFILE_INFO_SUCCESS);
export const getProfileInfoFailure = createAction(GET_PROFILE_INFO_FAILURE);

function* getProfileInfo(reqData) {
  yield put(getProfileInfoRequest());
  try {

    const profiles = yield select(getProfiles);
    let list = [];
    let iter = 0, len = reqData.payload.length;
    for (iter; iter < len; iter++) {
      const item = reqData.payload[iter];
      if (!isDataValid(profiles[item])) list.push(item);
    }

    let params = '';
    let iterParam = 0;
    let length = list.length;
    for (iterParam; iterParam < length; iterParam++) {
      params += list[iterParam];
      params += (iterParam !== length - 1) ? ',' : '';
    }

    const {response, error} = yield call(getMethod, `${apiConfig('v1')}/profile?id=${params}`);
    if (response) {
      if (response.data.metadata.success) {
        yield put(getProfileInfoSuccess(response.data.resultset.content));
      }
      else {
        yield put(getProfileInfoFailure('error'));
      }
    }
    if (error) {
      yield put(getProfileInfoFailure(error));
    }
  }
  catch (error) {
    yield put(getProfileInfoFailure(error));
  }
}

export function* watchGetProfileInfo() {
  yield takeEvery(GET_PROFILE_INFO_START, getProfileInfo)
}
