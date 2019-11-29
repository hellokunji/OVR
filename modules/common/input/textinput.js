/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../uncategorized/icon';
import TextComponent from '../../common/uncategorized/text';
import {FontFamily, Colors, FontSize} from '../../../config/theme';
import GlobalStyle from '../../../config/global_style';

class Input extends React.Component {

  state = {
    isFocused: false
  };

  toggleFocus = () => {
    this.setState({isFocused: !this.state.isFocused});
  };

  render() {
    const {label, placeholder, value, multiline, height, withIcon, iconName,
      hasError, errorText, secureTextEntry, onChange} = this.props;
    const {isFocused} = this.state;

    return (
      <View style={styles.textInput}>
        {label !== '' && <TextComponent text={label} style={GlobalStyle.inputLabel} fontWeight={'Light'}/>}
        <View styl={styles.inputBox}>
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              withIcon && styles.withIconInput,
              hasError && styles.withError
            ]}
            placeholder={placeholder}
            onFocus={this.toggleFocus}
            onBlur={this.toggleFocus}
            multiline={multiline}
            height={height}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            value={value}
          />
          {withIcon && (
            <View style={styles.icon}>
              <Icon size={16} color={isActive ? Colors.darkGrey : Colors.midGrey} name={iconName}/>
            </View>
          )}
        </View>
        {hasError && <TextComponent text={errorText} style={GlobalStyle.inputErrorText}/>}
      </View>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  height: PropTypes.number,
  withIcon: PropTypes.bool,
  iconName: PropTypes.string,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  secureTextEntry: PropTypes.bool
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  multiline: false,
  height: 30,
  withIcon: false,
  iconName: null,
  hasError: false,
  errorText: 'Invalid',
  secureTextEntry: false,
  onChange: () => {
  }
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    position: 'relative'
  },
  inputBox: {
    position: 'relative'
  },
  input: {
    borderBottomColor: Colors.midGrey,
    borderBottomWidth: 1,
    fontSize: 16,
    paddingVertical: 5
  },
  inputFocused: {
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 2,
  },
  withError: {
    borderBottomColor: Colors.red,
    borderBottomWidth: 2
  },
  withIconInput: {
    paddingLeft: 28,
    fontFamily: FontFamily.primaryFont
  },
  icon: {
    position: 'absolute',
    bottom: 9,
    left: 0
  },
});