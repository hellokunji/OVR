/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import { StyleSheet, Platform } from 'react-native';
import {Colors} from './theme';

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  inputLabel: {
    color: Colors.midGrey,
    fontSize: 14,
    marginBottom: 6
  },
  inputErrorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 3
  }
});