/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {createAction} from 'redux-actions';
import {put, takeEvery} from 'redux-saga/effects';
import {
  SIDEBAR_STATUS_START,
  SIDEBAR_STATUS_UPDATE,
  SIDEBAR_VIEW_START,
  SIDEBAR_VIEW_UPDATE,
  TOAST_UPDATE
} from '../action_types';

export const sidebarStatusStart = createAction(SIDEBAR_STATUS_START);
export const sidebarStatusUpdate = createAction(SIDEBAR_STATUS_UPDATE);

export const sidebarViewStart = createAction(SIDEBAR_VIEW_START);
export const sidebarViewUpdate = createAction(SIDEBAR_VIEW_UPDATE);

export const toastUpdate = createAction(TOAST_UPDATE);

function* sidebarStatus(payload) {
  yield put(sidebarStatusUpdate(payload));
}

function* sidebarView() {
  yield put(sidebarViewUpdate());
}

export function* watchSidebar() {
  yield takeEvery(SIDEBAR_STATUS_START, sidebarStatus);
  yield takeEvery(SIDEBAR_VIEW_START, sidebarView);
}