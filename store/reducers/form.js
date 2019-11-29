/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import ip from 'icepick';
import {UPDATE_FORM, UPDATE_ONBOARDING_FORM, RESET_FORM} from '../action_types';
import {getRandomNum} from '../../utils/helpers';

const initialState = ip.freeze({
  onboarding: {
    school: {
      organizationName: '',
      city: '',
      licence: '',
      //salaryMin: '',
      //salaryMax: '',
      salaryRange: '',
      currency: 'CNY',
      bio: '',
      image: null
    },
    teacher: {
      nationality: '',
      gender: '',
      dobDay: '01',
      dobMonth: '01',
      dobYear: '',
      bio: '',
      image: null
    },
    randomNumber: getRandomNum()
  }
});

export default function (state = initialState, action) {
  switch (action.type) {

    case UPDATE_FORM: {
      if (action.payload.onboarding) state = ip.setIn(state, ['onboarding'], action.payload.onboarding);
      return state;
    }

    case UPDATE_ONBOARDING_FORM: {
      if (action.payload.school) state = ip.setIn(state, ['onboarding', 'school'], action.payload.school);
      if (action.payload.teacher) state = ip.setIn(state, ['onboarding', 'teacher'], action.payload.teacher);
      state = ip.setIn(state, ['onboarding', 'randomNumber'], getRandomNum());
      return state;
    }

    case RESET_FORM: {
      state = ip.setIn(state, ['onboarding'], initialState.onboarding);
      return state;
    }

    default:
      return state;
  }
}