/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import {Colors} from '../../../config/theme';

const InlinePageLoader = () => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <ActivityIndicator color={Colors.midGrey} size={'large'}/>
      </View>
    </View>
  )
};

export default InlinePageLoader;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {

  },
  text: {
    fontSize: 16
  }
});