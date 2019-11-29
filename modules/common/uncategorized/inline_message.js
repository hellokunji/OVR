/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import TextComponent from './text';

const InlineMessage = props => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <TextComponent text={props.message} style={styles.text}/>
      </View>
    </View>
  )
};

InlineMessage.propTypes = {
  message: PropTypes.string.isRequired
};

InlineMessage.defaultProps = {

};

export default InlineMessage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {

  },
  text: {
    fontSize: 16
  }
});