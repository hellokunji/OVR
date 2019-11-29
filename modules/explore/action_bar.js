/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import IcoMoon from '../common/uncategorized/icon';
import {Colors} from '../../config/theme';

const ActionBar = props => {
  const {pressUndo, pressView, pressSuperLike, pressLike, pressBoost} = props;
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.actionItem} onPress={pressUndo}>
        <IcoMoon name='undo' size={34}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}
                        onPress={pressView}>
        <IcoMoon name='cross' size={34}/>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionItem, styles.actionItemMiddle]}
                        onPress={pressSuperLike}>
        <Image style={styles.actionMiddleImg} source={require('../../static/img/icons/startup.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}
                        onPress={pressLike}>
        <IcoMoon name='check' size={34}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}
                        onPress={pressBoost}>
        <IcoMoon name='power' size={34}/>
      </TouchableOpacity>
    </View>
  )
};

export default ActionBar;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  actionItem: {
    width: '19%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionItemMiddle: {
    width: '22%',
    alignItems: 'center'
  },
  actionMiddleImg: {
    width: 40,
    height: 40
  }
});