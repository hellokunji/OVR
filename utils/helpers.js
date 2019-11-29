/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {experienceData, salaryRange} from '../data/common';

export const checkIfEmailValid = email => {
  let isValid = false;
  if (isDataValid(email)) {
    isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }
  return isValid;
};

export const isNumber = data => {
  let isValid = false;
  if(isDataValid(data)) {
    isValid = !isNaN(data);
  }
  return isValid;
};

export const isObjectEmpty = obj => {
  if (obj === null || typeof obj !== 'object') return true;

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const isDataValid = data => {
  let isValid = false;
  if (data !== null && data !== undefined) isValid = true;
  return isValid;
};

export const extractDob = dob => {
  const newDate = new Date(dob);
  //let splitArr = dob.split('-');
  return {
    year: (newDate.getFullYear()).toString(),
    month: (newDate.getMonth() + 1).toString(),
    day: (newDate.getDate()).toString()
  };
};

export const formatDate = (obj, format = 'DD/MM/YYYY') => {
  let result = null;
  if (isDataValid(obj)) {
    if (format === 'DD/MM/YYYY') {
      result = `${('0' + obj.day).slice(-2)}-${('0' + obj.month).slice(-2)}-${obj.year}`
    }
    else if(format === 'YYYY/MM/DD') {
      result = `${obj.year}-${('0' + obj.month).slice(-2)}-${('0' + obj.day).slice(-2)}`
    }
  }
  return result;
};

export const getProfileImg = (images, gender = null, usageRole = null) => {
  let source = null;

  let isValid = false;
  if (images !== '') {
    if (isDataValid(images)) {
      if (images.length > 0) isValid = isDataValid(images[0]);
    }
  }

  if (isValid) {
    source = {uri: images[0]}; //NATIVE SPECIFIC CODE
  }
  else {
    if (usageRole.toLowerCase() === 'teacher') {
      source = gender === 'FEMALE' ? require('../static/img/teacher-female.png') : require('../static/img/teacher-male.png'); //NATIVE SPECIFIC CODE
    }
    else {
      source = require('../static/img/organization.png') //NATIVE SPECIFIC CODE
    }
  }

  return source;
};

export const calculateYearFromNow = years => {
  const currentTimestamp = Date.now();
  const yearTimestamp = years*365*24*60*60*1000;

  const date = new Date(currentTimestamp - yearTimestamp);

  return date.getFullYear();
};

export const getRandomNum = () => {
  return Math.ceil(Math.random()*100000);
};

export const getYearList = () => {
  let result = [];
  let date = new Date();
  for (let iter = date.getUTCFullYear() - 1; iter > 1947; iter--) result.push({name: iter});
  return result;
};

export const getFirstLine = (profile, usageRole) => {
  let result = '';
  if (usageRole.toLowerCase() === 'school') {
    result = `${profile.first_name !== undefined ? profile.first_name : ''}`;
    const newD = new Date();
    const currentYear = newD.getFullYear();
    if (isDataValid(profile.dob)) result += `, ${currentYear - extractDob(profile.dob).year}`;
    if (isDataValid(profile.nationality)) result += `, ${profile.nationality}`;
  }
  else {
    result = isDataValid(profile.job_title) ? profile.job_title : '';
  }
  return result;
};

export const getSecondLine = (profile, usageRole) => {
  let result = '';
  if (usageRole.toLowerCase() === 'school') {
    if (isDataValid(profile.highest_awarded_degree)) result = profile.highest_awarded_degree;
  }
  else {
    if(isDataValid(profile.school_name)) {
      result = profile.school_name;
      if (isDataValid(profile.location)) result += ` ${profile.location}`;
    }
  }
  return result;
};

export const getThirdLine = (profile, usageRole) => {
  let result = '';
  if (usageRole.toLowerCase() === 'school') {
    if (isDataValid(profile.min_experience)) {
      const experienceIndex = experienceData.findIndex(item => item.min === profile.min_experience);
      if (experienceIndex !== -1) result = `Industry Experience: ${experienceData[experienceIndex].name}`;
    }
  }
  else {
    if (isDataValid(profile.min_salary)) {
      const rangeIndex = salaryRange.findIndex(item => item.min === profile.min_salary);
      if (rangeIndex !== -1) result = `${profile.currency} ${salaryRange[rangeIndex].name}`;
    }
  }
  return result;
};

export const splitArrayForGrid = (array, columns) => {
  let arr = [...array];

  let result = [];

  const rows = Math.floor(arr.length/columns);
  const reminder = arr.length%columns;

  let rowIter = 0;
  for (rowIter; rowIter < rows; rowIter++) {
    //console.log('rowIter', rowIter);
    const splicedArr = [];
    for (let splicedIter = rowIter*columns; splicedIter < (rowIter + 1)*columns; splicedIter++) {
      splicedArr.push(arr[splicedIter]);
    }
    //console.log(splicedArr);
    result.push(splicedArr);
  }

  if (reminder > 0) {
    let arrReminder = arr.splice(rows*columns, reminder);
    result.push(arrReminder);
  }

  return result;
};

export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
};

export const handelApiResponse = response => {
 let obj = {
   success: false,
   errMsg: ''
 };
 if (response.status >= 200 && response.status < 300) {
   obj.success = true;
 }
 else if (response.status >= 300 && response.status < 400) {

 }
 else if (response.status >= 400 && response.status < 500) {
   obj.success = false;
   if (response.status === 401) {

   }
 }
 else if (response.status >= 500 && response.status < 600) {
   obj.success = false;
 }
 else {

 }
};

export const handelApiError = error => {

};
