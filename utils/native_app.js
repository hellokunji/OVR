/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {Platform } from 'react-native';
import { getInset } from 'react-native-safe-area-view';

export const getUnsafePadding = () => {
  const bottomPadding = getInset('bottom', false);
  const topPadding = getInset('top', false);
  const defaultPadding = Platform.OS === 'android' ? -25 : 0;

  return bottomPadding + topPadding - defaultPadding;
};

export const getBottomUnsafePadding = () => {
  return getInset('bottom', false);
};
