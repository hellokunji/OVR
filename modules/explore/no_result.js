/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import Button from '../common/button/button';
import {Colors} from '../../config/theme';
import TextComponent from '../common/uncategorized/text';

const NoResult = props => {
  return (
    <View style={styles.main}>
      <View style={styles.box}>
        <TextComponent
          text={props.usageRole === 'school' ? `No results to show` : `No results to show`}
          style={styles.title}
        />
        <TextComponent
          text={`Try another search!`}
          style={styles.subtitle}
        />
        <Button
          onClick={() => props.navigation.navigate('NewMatches')}
          width={200}
          label='See matches'
          type='cyanOutline'
        />
      </View>
    </View>
  )
};

export default withNavigation(NoResult);

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  box: {
    width: '100%',
    height: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.cyan,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    borderRadius: 10
  },
  title: {
    color: Colors.cyan,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle: {
    color: Colors.lightGrey,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40
  }
});