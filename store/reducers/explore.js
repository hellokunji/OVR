/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import ip from 'icepick';
import {
  GET_EXPLORE_DATA_REQUEST,
  GET_EXPLORE_DATA_SUCCESS,
  GET_EXPLORE_DATA_FAILURE,
  SET_EXPLORE_DATA_REQUEST,
  SET_EXPLORE_DATA_SUCCESS,
  SET_EXPLORE_DATA_FAILURE,
  SEARCH_PROFILES_REQUEST,
  SEARCH_PROFILES_SUCCESS,
  SEARCH_PROFILES_FAILURE,
  GET_CONNECTION_REQUEST,
  GET_CONNECTION_SUCCESS,
  GET_CONNECTION_FAILURE,
  SET_EXPLORE_VIEWED,
  SET_EXPLORE_UNVIEWED,

  RESET_EXPLORE
} from '../action_types';
import {getRandomNum} from '../../utils/helpers';

const initialState = ip.freeze({
  getExploreData: {
    apiStatus: null,
    apiError: null,
    data: null,
    offset: 0,
    isFinished: false,
    randomNumber: getRandomNum()
  },
  setExploreData: {
    apiStatus: null,
    apiError: null,
    data: null
  },
  searchProfiles: {
    apiStatus: null,
    apiError: null,
    data: null,
    filter: null
  }
});

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_EXPLORE_DATA_REQUEST: {
      state = ip.setIn(state, ['getExploreData', 'apiStatus'], 'started');
      state = ip.setIn(state, ['getExploreData', 'apiError'], null);
      return state;
    }

    case GET_EXPLORE_DATA_SUCCESS: {
      state = ip.setIn(state, ['getExploreData', 'apiStatus'], 'success');
      let setData = [];
      let iter = 0;
      const length = action.payload.data.length;
      for (iter; iter<length; iter++) {
        let setItem = action.payload.data[iter];
        setItem.viewed = false;
        setData.push(setItem);
      }
      const exploreData = ip.thaw(state.getExploreData.data);
      const data = exploreData !== null ? [...setData, ...exploreData] : setData;
      state = ip.setIn(state, ['getExploreData', 'data'], data);
      state = ip.setIn(state, ['getExploreData', 'isFinished'], action.payload.isFinished);
      state = ip.setIn(state, ['getExploreData', 'offset'], action.payload.offset);
      state = ip.setIn(state, ['getExploreData', 'apiError'], null);
      state = ip.setIn(state, ['getExploreData', 'randomNumber'], getRandomNum());
      return state;
    }

    case GET_EXPLORE_DATA_FAILURE: {
      state = ip.setIn(state, ['getExploreData', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['getExploreData', 'apiError'], action.payload);
      return state;
    }

    case SET_EXPLORE_DATA_REQUEST: {
      state = ip.setIn(state, ['setExploreData', 'apiStatus'], 'started');
      state = ip.setIn(state, ['setExploreData', 'apiError'], null);
      return state;
    }

    case SET_EXPLORE_DATA_SUCCESS: {
      state = ip.setIn(state, ['setExploreData', 'apiStatus'], 'success');
      state = ip.setIn(state, ['setExploreData', 'data'], action.payload);
      state = ip.setIn(state, ['setExploreData', 'apiError'], null);
      return state;
    }

    case SET_EXPLORE_DATA_FAILURE: {
      state = ip.setIn(state, ['setExploreData', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['setExploreData', 'apiError'], action.payload);
      return state;
    }

    case SEARCH_PROFILES_REQUEST: {
      state = ip.setIn(state, ['searchProfiles', 'apiStatus'], 'started');
      state = ip.setIn(state, ['searchProfiles', 'apiError'], null);
      state = ip.setIn(state, ['getExploreData', 'apiStatus'], 'started');
      state = ip.setIn(state, ['getExploreData', 'apiError'], null);
      return state;
    }

    case SEARCH_PROFILES_SUCCESS: {
      state = ip.setIn(state, ['searchProfiles', 'apiStatus'], 'success');
      //state = ip.setIn(state, ['searchProfiles', 'data'], action.payload.data);
      let setData = [];
      let iter = 0;
      const length = action.payload.data.length;
      for (iter; iter<length; iter++) {
        let setItem = action.payload.data[iter];
        setItem.viewed = false;
        setData.push(setItem);
      }
      const exploreData = ip.thaw(state.getExploreData.data);
      const data = state.getExploreData.offset !== 0 ? (exploreData !== null ? [...setData, ...exploreData] : setData) : setData;
      state = ip.setIn(state, ['getExploreData', 'data'], data);
      state = ip.setIn(state, ['getExploreData', 'isFinished'], action.payload.isFinished);
      state = ip.setIn(state, ['getExploreData', 'offset'], action.payload.offset);
      state = ip.setIn(state, ['searchProfiles', 'filter'], action.payload.filter);
      state = ip.setIn(state, ['searchProfiles', 'apiError'], null);
      state = ip.setIn(state, ['getExploreData', 'apiStatus'], 'success');
      state = ip.setIn(state, ['getExploreData', 'apiError'], null);
      return state;
    }

    case SEARCH_PROFILES_FAILURE: {
      state = ip.setIn(state, ['searchProfiles', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['searchProfiles', 'apiError'], action.payload);
      state = ip.setIn(state, ['getExploreData', 'apiStatus'], 'success');
      state = ip.setIn(state, ['getExploreData', 'apiError'], action.payload);
      return state;
    }

    case SET_EXPLORE_VIEWED: {
      let data = ip.thaw(state.getExploreData.data);
      const index = data.findIndex(item => (item.id === action.payload.userId && item.viewed === false));
      if (index !== -1) data[index].viewed = true;
      state = ip.setIn(state, ['getExploreData', 'data'], data);
      state = ip.setIn(state, ['getExploreData', 'randomNumber'], getRandomNum());
      return state;
    }

    case SET_EXPLORE_UNVIEWED: {
      let data = ip.thaw(state.getExploreData.data);
      const index = data.findIndex(item => (item.id === action.payload.userId && item.viewed === true));
      if (index !== -1) data[index].viewed = false;
      state = ip.setIn(state, ['getExploreData', 'data'], data);
      state = ip.setIn(state, ['getExploreData', 'randomNumber'], getRandomNum());
      return state;
    }

    case RESET_EXPLORE: {
      state = ip.setIn(state, ['getExploreData'], initialState.getExploreData);
      state = ip.setIn(state, ['setExploreData'], initialState.setExploreData);
      state = ip.setIn(state, ['searchProfiles'], initialState.searchProfiles);
      return state;
    }

    default:
      return state;
  }
}