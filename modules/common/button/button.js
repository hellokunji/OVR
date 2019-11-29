/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {FontFamily, Colors} from '../../../config/theme';

class Button extends React.Component {
  render() {
    const {type, isFullWidth, isDisabled, isLoading, onClick, size, label, width, height} = this.props;

    let color = null;
    if (type === 'default') color = Colors.white;
    if (type === 'greyOutline') color = Colors.midGrey;
    if (type === 'white') color = Colors.midGrey;
    if (type === 'whiteOutline') color = Colors.midGrey;
    if (type === 'cyanOutline') color = Colors.cyan;

    return (
      <TouchableOpacity
        onPress={!isDisabled ? onClick : null}
        disabled={isDisabled}
        style={[
          styles.btn,
          isFullWidth && styles.fullWidthBtn,
          isDisabled && styles.disabledBtn,

          type === 'default' && styles.defaultBtn,
          type === 'greyOutline' && styles.greyOutlineBtn,
          type === 'white' && styles.whiteBtn,
          type === 'whiteOutline' && styles.whiteOutlineBtn,
          type === 'cyanOutline' && styles.cyanOutlineBtn,

          size === 'xs' && styles.btnSizeXS,
          size === 's' && styles.btnSizeS,
          size === 'm' && styles.btnSizeM,
          size === 'l' && styles.btnSizeL,
          size === 'xl' && styles.btnSizeXL,

          width !== 111111111 && {width},
          height !== 111111111 && {height}
        ]}
      >
        {isLoading ? <ActivityIndicator size='small' color={color}/> : (
          <View style={styles.btnContent}>
            {label !== '' ? (
              <Text
                style={[
                  styles.btnTxt,
                  type === 'default' && styles.defaultBtnTxt,
                  type === 'greyOutline' && styles.greyOutlineBtnTxt,
                  type === 'white' && styles.whiteBtnTxt,
                  type === 'whiteOutline' && styles.whiteOutlineBtnTxt,
                  type === 'cyanOutline' && styles.cyanOutlineBtnTxt,

                  size === 'xs' && styles.btnTxtSizeXS,
                  size === 's' && styles.btnTxtSizeS,
                  size === 'm' && styles.btnTxtSizeM,
                  size === 'l' && styles.btnTxtSizeL,
                  size === 'xl' && styles.btnTxtSizeXL
                ]}
              >
                {label}
              </Text>
            ) : (
              this.props.children
            )}

          </View>
        )}
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['default', 'greyOutline', 'white', 'whiteOutline', 'cyanOutline']),
  isDisabled: PropTypes.bool,
  showLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  width: PropTypes.number,
  height: PropTypes.number,
  isFullWidth: PropTypes.bool,
  label: PropTypes.string
};

Button.defaultProps = {
  type: 'default',
  isDisabled: false,
  showLoading: false,
  size: 'm',
  width: 111111111,
  height: 111111111,
  isFullWidth: true,
  label: ''
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30
  },
  btnContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 7
  },
  btnTxt: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: FontFamily.primaryFont
  },
  fullWidthBtn: {
    width: '100%'
  },
  disabledBtn: {
    opacity: 0.7
  },

  defaultBtn: {
    backgroundColor: Colors.cyan
  },
  defaultBtnTxt: {
    color: Colors.white
  },

  greyOutlineBtn: {
    backgroundColor: 'transparent',
    borderColor: Colors.lightGrey,
    borderWidth: 1
  },
  greyOutlineBtnTxt: {
    color: Colors.darkGrey
  },

  cyanOutlineBtn: {
    backgroundColor: 'transparent',
    borderColor: Colors.cyan,
    borderWidth: 1
  },
  cyanOutlineBtnTxt: {
    color: Colors.cyan
  },

  whiteBtn: {
    backgroundColor: Colors.white
  },
  whiteBtnTxt: {
    color: Colors.midGrey
  },

  whiteOutlineBtn: {
    backgroundColor: 'transparent',
    borderColor: Colors.white,
    borderWidth: 1
  },
  whiteOutlineBtnTxt: {
    color: Colors.white
  },

  btnSizeXS: {
    height: 30,
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  btnTxtSizeXS: {
    fontSize: 12,
    textAlign: 'center'
  },
  btnSizeS: {
    height: 34,
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  btnTxtSizeS: {
    fontSize: 13,
    textAlign: 'center'
  },
  btnSizeM: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  btnTxtSizeM: {
    fontSize: 15,
    textAlign: 'center'
  },
  btnSizeL: {
    height: 46,
    paddingVertical: 13,
    paddingHorizontal: 15
  },
  btnTxtSizeL: {
    fontSize: 16,
    textAlign: 'center'
  },
  btnSizeXL: {
    height: 54,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  btnTxtSizeXL: {
    fontSize: 16,
    textAlign: 'center'
  },
});