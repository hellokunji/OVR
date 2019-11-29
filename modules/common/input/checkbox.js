/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import IcoMoon from '../uncategorized/icon';
import {Colors} from '../../../config/theme';

const Checkbox = props => {
  return (
    <TouchableOpacity
      style={[styles.checkbox, props.isChecked && styles.checkboxActive]}
      onPress={props.onChange}>
      {props.isChecked && <IcoMoon name='check' size={12} color={Colors.white}/>}
    </TouchableOpacity>
  )
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  isChecked: false,
  onChange: null
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderColor: Colors.cyan,
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  checkboxActive: {
    backgroundColor: Colors.cyan,
    paddingHorizontal: 3
  }
});