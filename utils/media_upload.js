/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import RNFetchBlob from 'rn-fetch-blob';
import {apiConfig} from '../config/config';

export function uploadMediaFromMobile(token, location, file) {
  //console.log('file', file);
  const obj = {
    name: 'fileName',
    filename: 'fileName',
    type: file.payload.mime,
    data: RNFetchBlob.wrap(file.payload.path)
  };
  //console.log('obj', obj);
  let url = `${apiConfig('v1')}/upload/image`;
  if (file.payload.folderName) url += `?folder_name=${file.payload.folderName}`;
  return RNFetchBlob.fetch('POST', url, {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  }, [obj])
    .uploadProgress((written, total) => {
      //console.log('uploaded', written / total)
    })
    .then((resp) => {
      console.log('resp', resp);
      return {error: null, response: resp};
    })
    .catch((err) => {
      //console.log(err);
      //return { error: err };
      return {error: err, response: null};
    })
}

export function uploadMediaFromMobileVideo(token, location, mediauri) {

  // console.log('mediauriL=',RNFetchBlob.wrap(mediauri));

  return RNFetchBlob.fetch('POST', `https://qa.ballprk.xyz/api/v1/upload/video`, {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  }, [
    // part file from storage
    {name: 'fileName', filename: 'fileName', type: 'video/mp4', data: RNFetchBlob.wrap(mediauri)},

  ]).then((resp) => {
    //console.log(resp);
    return {error: null, response: resp};

  }).catch((err) => {
    //console.log(err);
    //return { error: err };
    return {error: err, response: null}
  })

}

