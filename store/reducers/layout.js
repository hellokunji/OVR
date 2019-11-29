/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import ip from 'icepick';
import {SIDEBAR_STATUS_UPDATE, SIDEBAR_VIEW_UPDATE, TOAST_UPDATE} from '../action_types'

const initialState = ip.freeze({
  sidebar: {
    show: false
  },
  toast: {
    show: false,
    type: null, //'success', 'error', 'warning'
    content: {
      title: '',
      description: ''
    },
    interval: null
  }
});

export default function (state = initialState, action) {
  switch (action.type) {

    case SIDEBAR_STATUS_UPDATE: {
      state = ip.setIn(state, ['sidebar'], action.payload);
      return state;
    }

    case SIDEBAR_VIEW_UPDATE: {
      state = ip.setIn(state, ['sidebar', 'show'], !state.sidebar.show);
      return state;
    }

    case TOAST_UPDATE: {
      state = ip.setIn(state, ['toast'], action.payload);
      return state;
    }

    default:
      return state;

  }
}