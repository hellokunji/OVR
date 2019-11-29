/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {createAction} from 'redux-actions';
import {UPDATE_FORM, UPDATE_ONBOARDING_FORM} from '../action_types';

export const updateForm = createAction(UPDATE_FORM);
export const updateOnboardingForm = createAction(UPDATE_ONBOARDING_FORM);