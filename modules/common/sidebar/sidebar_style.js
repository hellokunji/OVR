/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../../../config/theme';

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: Colors.cyan
  },

  head: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 23,
    justifyContent: 'center'
  },
  headImg: {
    width: 94,
    height: 94,
    borderRadius: 47,
    alignSelf: 'center'
  },
  headTitle: {
    fontSize: 24,
    marginTop: 7,
    textAlign: 'center',
    color: Colors.white
  },

  links: {
    paddingHorizontal: 23,
    paddingVertical: 15
  },
  link: {
    paddingVertical: 10,
    flexDirection: 'row',
    marginVertical: 2
  },
  linkIcon: {
    marginRight: 15
  },
  linkText: {
    fontSize: 18,
    fontFamily: FontFamily.primaryFont,
    color: Colors.white,
    fontWeight: '100'
  },
  checklistLink: {
    paddingTop: 10,
    marginVertical: 2
  },
  checklistBox: {
    flexDirection: 'row',
  },
  checklistStatus: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 36,
    marginTop: 2
  },
  checklistBar: {
    flex: 4,
    paddingRight: 15
  },
  checklistLabel: {
    flex: 2,
    color: Colors.white
  },

  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})