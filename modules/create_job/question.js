/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, Switch} from 'react-native';
import PropTypes from 'prop-types';
import TextComponent from '../common/uncategorized/text';
import {Colors} from '../../config/theme';

const Question = props => {
  return (
    <View style={styles.main}>
      <View style={styles.info}>
        <TextComponent text={props.title} style={styles.title} fontWeight='Medium'/>
        <TextComponent text={props.description} style={styles.description}/>
      </View>
      <View style={styles.action}>
        <Switch onValueChange={value => props.onChange(value)} value={props.value} trackColor={Colors.cyan}/>
      </View>
    </View>
  )
};

Question.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

Question.defaultProps = {

};

export default Question;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row'
  },
  info: {
    flex: 4
  },
  title: {
    fontSize: 16
  },
  description: {
    fontSize: 14,
    marginTop: 3
  },
  action: {
    flex: 1,
    alignItems: 'flex-end'
  }
});