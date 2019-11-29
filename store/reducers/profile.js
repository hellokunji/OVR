/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import ip from 'icepick';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  RESET_PROFILE
} from '../action_types';
import {getRandomNum} from "../../utils/helpers";

const initialState = ip.freeze({
  getUser: {
    apiStatus: null,
    apiError: null,
    data: null,
    metaData: null
  },
  updateUser: {
    apiStatus: null,
    apiError: null,
    data: null,
    randomNumber: getRandomNum()
  },
  createProfile: {
    apiStatus: null,
    apiError: null,
    data: null
  },
  getProfile: {
    apiStatus: null,
    apiError: null,
    data: null
  },
  updateProfile: {
    apiStatus: null,
    apiError: null,
    data: null
  }
});

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_USER_REQUEST: {
      state = ip.setIn(state, ['getUser', 'apiStatus'], 'started');
      state = ip.setIn(state, ['getUser', 'apiError'], null);
      state = ip.setIn(state, ['getProfile', 'apiStatus'], 'started');
      state = ip.setIn(state, ['getProfile', 'apiError'], null);
      return state;
    }

    case GET_USER_SUCCESS: {
      state = ip.setIn(state, ['getUser', 'apiStatus'], 'success');
      state = ip.setIn(state, ['getUser', 'apiError'], null);
      state = ip.setIn(state, ['getUser', 'data'], action.payload.user_data);
      state = ip.setIn(state, ['getUser', 'metaData'], action.payload.user_meta_data);
      state = ip.setIn(state, ['getProfile', 'apiStatus'], 'success');
      state = ip.setIn(state, ['getProfile', 'apiError'], null);
      state = ip.setIn(state, ['getProfile', 'data'], action.payload.profile);
      return state;
    }

    case GET_USER_FAILURE: {
      state = ip.setIn(state, ['getUser', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['getUser', 'apiError'], action.payload);
      state = ip.setIn(state, ['getProfile', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['getProfile', 'apiError'], action.payload);
      return state;
    }

    case UPDATE_USER_REQUEST: {
      state = ip.setIn(state, ['updateUser', 'apiStatus'], 'started');
      state = ip.setIn(state, ['updateUser', 'apiError'], null);
      state = ip.setIn(state, ['updateUser', 'randomNumber'], getRandomNum());
      return state;
    }

    case UPDATE_USER_SUCCESS: {
      state = ip.setIn(state, ['updateUser', 'apiStatus'], 'success');
      state = ip.setIn(state, ['updateUser', 'apiError'], null);
      state = ip.setIn(state, ['getUser', 'data'], action.payload.user_data);
      let profileData = ip.thaw(state.getProfile.data);
      profileData.first_name = action.payload.user_data.first_name;
      profileData.last_name = action.payload.user_data.last_name;
      state = ip.setIn(state, ['getProfile', 'data'], profileData);
      state = ip.setIn(state, ['updateUser', 'randomNumber'], getRandomNum());
      return state;
    }

    case UPDATE_USER_FAILURE: {
      state = ip.setIn(state, ['updateUser', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['updateUser', 'apiError'], action.payload);
      state = ip.setIn(state, ['updateUser', 'randomNumber'], getRandomNum());
      return state;
    }

    case CREATE_PROFILE_REQUEST: {
      state = ip.setIn(state, ['createProfile', 'apiStatus'], 'started');
      state = ip.setIn(state, ['createProfile', 'apiError'], null);
      return state;
    }

    case CREATE_PROFILE_SUCCESS: {
      state = ip.setIn(state, ['createProfile', 'apiStatus'], 'success');
      state = ip.setIn(state, ['createProfile', 'apiError'], null);
      state = ip.setIn(state, ['createProfile', 'data'], action.payload);
      state = ip.setIn(state, ['getProfile', 'data'], action.payload);
      return state;
    }

    case CREATE_PROFILE_FAILURE: {
      state = ip.setIn(state, ['createProfile', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['createProfile', 'apiError'], action.payload);
      return state;
    }

    case GET_PROFILE_REQUEST: {
      state = ip.setIn(state, ['getProfile', 'apiStatus'], 'started');
      state = ip.setIn(state, ['getProfile', 'apiError'], null);
      return state;
    }

    case GET_PROFILE_SUCCESS: {
      state = ip.setIn(state, ['getProfile', 'apiStatus'], 'success');
      state = ip.setIn(state, ['getProfile', 'apiError'], null);
      state = ip.setIn(state, ['getProfile', 'data'], action.payload);
      return state;
    }

    case GET_PROFILE_FAILURE: {
      state = ip.setIn(state, ['getProfile', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['getProfile', 'apiError'], action.payload);
      return state;
    }

    case UPDATE_PROFILE_REQUEST: {
      state = ip.setIn(state, ['updateProfile', 'apiStatus'], 'started');
      state = ip.setIn(state, ['updateProfile', 'apiError'], null);
      return state;
    }

    case UPDATE_PROFILE_SUCCESS: {
      state = ip.setIn(state, ['updateProfile', 'apiStatus'], 'success');
      state = ip.setIn(state, ['updateProfile', 'apiError'], null);
      state = ip.setIn(state, ['getProfile', 'data'], action.payload);
      return state;
    }

    case UPDATE_PROFILE_FAILURE: {
      state = ip.setIn(state, ['updateProfile', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['updateProfile', 'apiError'], action.payload);
      return state;
    }

    case RESET_PROFILE: {
      state = ip.setIn(state, ['getUser'], initialState.getUser);
      state = ip.setIn(state, ['updateUser'], initialState.updateUser);
      state = ip.setIn(state, ['createProfile'], initialState.createProfile);
      state = ip.setIn(state, ['getProfile'], initialState.getProfile);
      state = ip.setIn(state, ['updateProfile'], initialState.updateProfile);
      return state;
    }

    default:
      return state;
  }
}