/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import TextComponent from '../../common/uncategorized/text';
import GlobalStyle from '../../../config/global_style';
import {Colors} from "../../../config/theme";

const RadioInput = props => {
  const {label, value, onChange, options, hasError, errorText} = props;
  return (
    <View style={styles.main}>
      {label !== '' && <TextComponent text={label} style={GlobalStyle.inputLabel}/>}
      <View style={styles.input}>
        {options.map((item) => {
          return (
            <View key={item.key} style={styles.item}>
              <TouchableOpacity style={styles.itemBox} onPress={() => onChange(item.value)}>
                <View style={[styles.radio, value === item.value ? styles.radioActive : null]}/>
                <TextComponent text={item.label} style={styles.radioLabel}/>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
      {hasError && <TextComponent text={errorText} style={GlobalStyle.inputErrorText}/>}
    </View>
  )
};

RadioInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  errorText: PropTypes.string
};

RadioInput.defaultProps = {
  label: '',
  value: '',
  hasError: false,
  errorText: 'Invalid'
};

export default RadioInput;

const styles = StyleSheet.create({
  main: {

  },
  input: {
    flexDirection: 'row',
  },
  item: {
    paddingRight: 20
  },
  itemBox: {
    flexDirection: 'row'
  },
  radio: {
    width: 18,
    height: 18,
    borderColor: Colors.cyan,
    borderWidth: 2,
    borderRadius: 9
  },
  radioActive: {
    borderWidth: 6
  },
  radioLabel: {
    paddingLeft: 5
  }
});
