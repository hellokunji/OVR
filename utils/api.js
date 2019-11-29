/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import axios from 'axios';

export function getMethod(location) {
  return axios
    .get(`${location}`)
    .then((response) => {
      //console.log('response', response);
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
      return error;
    });
}

export function postMethod(location, body, headers = null) {
  return axios
    .post(`${location}`, body, headers)
    .then((response) => {
      //console.log('response', response);
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
    });
}

export function putMethod(location, body) {
  return axios
    .put(`${location}`, body)
    .then((response) => {
      //console.log('response', response);
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
    });
}

export function deleteMethod(location) {
  return axios
    .delete(`${location}`)
    .then((response) => {
      //console.log('response', response);
      return {response};
    })
    .catch((error) => {
      if (error.response) {
        return {error: error.response};
      }
      return error;
    });
}

export function setAuthHeaders(token) {
  axios.defaults.headers.common.Authorization = token;
}