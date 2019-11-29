/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20
  },

  section: {
    marginVertical: 10
  },
  sectionHead: {
    fontSize: 20,
    fontWeight: '600'
  },
  sectionBody: {
    marginTop: 5
  },
  inputItem: {
    marginVertical: 5,
  },
  inputItemCheckbox: {
    flexDirection: 'row',
    display: 'flex'
  },
  checkboxLabel: {
    flex: 6
  },
  checkboxLabelText: {
    fontSize: 16
  },
  checkboxAction: {
    flex: 1,
    alignItems: 'flex-end'
  },

  rangeDropDown: {
    marginBottom: 10
  },
  rangeValueText: {
    fontSize: 16
  }
})