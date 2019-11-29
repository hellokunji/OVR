/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Picker from 'react-native-picker';
import Icon from '../../common/uncategorized/icon';
import TextComponent from '../../common/uncategorized/text';
import GlobalStyle from '../../../config/global_style';
import {Colors, FontFamily} from '../../../config/theme';

class InlineDropDown extends React.Component {

  openPicker = () => {
    const {options, value, label, onChange} = this.props;
    let data = [];
    for (let iter = 0; iter < options.length; iter++) data.push(options[iter].name);
    Picker.init({
      pickerTitleText: label !== '' ? label : 'Select',
      pickerData: data,
      selectedValue: [value],
      pickerConfirmBtnColor: [43, 183, 179, 1],
      pickerCancelBtnColor: [43, 183, 179, 1],
      pickerToolBarFontSize: 18,
      pickerTextEllipsisLen: 100,
      pickerFontSize: 16,
      pickerBg: [196, 199, 206, 1],
      pickerToolBarBg: [232, 232, 232, 1],
      pickerFontFamily: FontFamily.primaryFontLight,
      pickerConfirmBtnText: 'Select',
      pickerCancelBtnText: 'Cancel',
      onPickerConfirm: data => {
        onChange(data[0]);
      },
      onPickerCancel: data => {
        //console.log(data);
      },
      onPickerSelect: data => {
        //console.log(data);
      }
    });
    Picker.show();
  };

  render() {
    const {label, placeholder, value, hasError, errorText} = this.props;
    return (
      <View style={styles.main}>
        {label !== '' && <TextComponent text={label} style={GlobalStyle.inputLabel}/>}
        <TouchableOpacity style={styles.preview} onPress={this.openPicker}>
          {value !== ''
            ? <TextComponent text={value} style={styles.previewValue}/>
            : <TextComponent text={placeholder} style={styles.previewPlaceholder}/>}
          <View style={styles.icon}>
            <Icon name='chevron-down' size={13} color={Colors.midGrey}/>
          </View>
        </TouchableOpacity>
        {hasError && <TextComponent text={errorText} style={GlobalStyle.inputErrorText}/>}
      </View>
    )
  }
}

InlineDropDown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array.isRequired, //Format[{'name': 'name'}]
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  errorText: PropTypes.string
};

InlineDropDown.defaultProps = {
  placeholder: 'Select',
  label: '',
  value: '',
  hasError: false,
  errorText: 'Invalid'
};

export default InlineDropDown;

const styles = StyleSheet.create({
  main: {},
  preview: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.midGrey,
    position: 'relative',
    paddingBottom: 7,
    paddingTop: 2
  },
  previewValue: {
    fontSize: 15
  },
  previewPlaceholder: {
    fontSize: 15,
    color: Colors.midGrey
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 6
  },

  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.57)'
  },
  body: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: 300,
    width: '100%',
    backgroundColor: Colors.white
  },
  optionItem: {
    paddingVertical: 5,
    marginVertical: 3
  },
  optionItemText: {
    fontSize: 18,
    fontWeight: '300'
  }
});