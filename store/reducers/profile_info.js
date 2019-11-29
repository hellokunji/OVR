/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import ip from 'icepick';
import {
  GET_PROFILE_INFO_REQUEST,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_FAILURE,
  RESET_PROFILE_INFO
} from '../action_types';

const initialState = ip.freeze({
  profiles: {
    apiStatus: null,
    apiError: null,
    data: {}
  }
});

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_PROFILE_INFO_REQUEST: {
      state = ip.setIn(state, ['profiles', 'apiStatus'], 'started');
      state = ip.setIn(state, ['profiles', 'apiError'], null);
      return state;
    }

    case GET_PROFILE_INFO_SUCCESS: {
      state = ip.setIn(state, ['profiles', 'apiStatus'], 'success');
      state = ip.setIn(state, ['profiles', 'apiError'], null);

      let profiles = ip.thaw(state.profiles.data);
      const payload = action.payload;
      let iter = 0, profileLen = payload.length;
      for (iter; iter < profileLen; iter++) {
        const profileItem = payload[iter];
        profiles[profileItem.id] = profileItem;
      }

      state = ip.setIn(state, ['profiles', 'data'], profiles);
      return state;
    }

    case GET_PROFILE_INFO_FAILURE: {
      state = ip.setIn(state, ['profiles', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['profiles', 'apiError'], action.payload);
      return state;
    }

    case RESET_PROFILE_INFO: {
      state = ip.setIn(state, ['profiles'], initialState.profiles);
      return state;
    }

    default:
      return state;
  }
}
