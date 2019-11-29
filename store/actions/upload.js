/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {createAction} from 'redux-actions';
import {call, put, takeEvery, select} from 'redux-saga/effects';
import {postMethod} from '../../utils/api';
import {apiConfig} from '../../config/config';
import {uploadMediaFromMobile} from '../../utils/media_upload'; //NATIVE SPECIFIC CODE
import {
  UPLOAD_IMAGE_START,
  UPLOAD_IMAGE_MOBILE_START,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE
} from '../action_types';
import {getAccessToken} from './selector';
import {toastUpdate} from './layout';

export const uploadImageStart = createAction(UPLOAD_IMAGE_START);
export const uploadImageMobileStart = createAction(UPLOAD_IMAGE_MOBILE_START);
export const uploadImageRequest = createAction(UPLOAD_IMAGE_REQUEST);
export const uploadImageSuccess = createAction(UPLOAD_IMAGE_SUCCESS);
export const uploadImageFailure = createAction(UPLOAD_IMAGE_FAILURE);

function* uploadImage(reqData) {
  yield put(uploadImageRequest());
  try {
    let url = `${apiConfig('v1')}/upload/image`;
    if (reqData.payload.folderName) url += `?folder_name=${reqData.payload.folderName}`;
    const {response, error} = yield call(postMethod, url, reqData.payload);
    if (response) {
      if (response.data.success) {
        yield put(uploadImageSuccess(response.data.content.image));
      }
      else {
        yield put(uploadImageFailure('error'));
      }
    }
    if (error) {
      yield put(uploadImageFailure(error));
    }
  }
  catch (error) {
    yield put(uploadImageFailure(error));
  }
}

export function* watchUploadImage() {
  yield takeEvery(UPLOAD_IMAGE_START, uploadImage)
}

//UPLOAD IMAGE FROM NATIVE --- NATIVE SPECIFIC CODE
function* uploadImageMobile(dataMedia) {
  yield put(uploadImageRequest());
  let token = yield select(getAccessToken);
  const {response, error} = yield call(uploadMediaFromMobile, token, `${apiConfig('v1')}/upload/image`, dataMedia);
  if (response) {
    if (response.data) {
      const data = JSON.parse(response.data);
      if (data.success) {
        yield put(uploadImageSuccess(data.content.image));
      }
      else {
        yield put(uploadImageFailure(data.errors[0]));
        yield put(toastUpdate({
          show: true,
          type: 'error',
          content: {
            title: 'Upload Error', description: data.errors[0]
          },
          interval: 5000
        }))
      }
    }
    else {
      yield put(uploadImageFailure('error'));
    }
  }
  if (error) {
    yield put(uploadImageFailure(error));
  }
}

export function* watchUploadImageMobile() {
  yield takeEvery(UPLOAD_IMAGE_MOBILE_START, uploadImageMobile)
}
