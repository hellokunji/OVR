/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import ip from 'icepick';
import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  RESET_UPLOAD
} from '../action_types';

const initialState = ip.freeze({
  uploadImage: {
    apiStatus: null,
    apiError: null,
    data: null
  },
});

export default function (state = initialState, action) {
  switch (action.type) {

    case UPLOAD_IMAGE_REQUEST: {
      state = ip.setIn(state, ['uploadImage', 'apiStatus'], 'started');
      state = ip.setIn(state, ['uploadImage', 'apiError'], null);
      return state;
    }

    case UPLOAD_IMAGE_SUCCESS: {
      state = ip.setIn(state, ['uploadImage', 'apiStatus'], 'success');
      state = ip.setIn(state, ['uploadImage', 'apiError'], null);
      state = ip.setIn(state, ['uploadImage', 'data'], action.payload);
      return state;
    }

    case UPLOAD_IMAGE_FAILURE: {
      state = ip.setIn(state, ['uploadImage', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['uploadImage', 'apiError'], action.payload);
      return state;
    }

    case RESET_UPLOAD: {
      state = ip.setIn(state, ['uploadImage'], initialState.uploadImage);
      return state;
    }

    default:
      return state;
  }
}
