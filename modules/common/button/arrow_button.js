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
import IcoMoon from '../uncategorized/icon';

class Button extends React.Component {
  render() {
    const {type, isFullWidth, isDisabled, isLoading, onClick, size, label, width, height} = this.props;

    let color = null;
    if (type === 'default') color = Colors.cyan;

    return (
      <TouchableOpacity
        onPress={!isDisabled ? onClick : null}
        disabled={isDisabled}
        style={[
          styles.btn,
          isFullWidth && styles.fullWidthBtn,
          isDisabled && styles.disabledBtn,

          type === 'default' && styles.defaultBtn,

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
            <Text
              style={[
                styles.btnTxt,
                type === 'default' && styles.defaultBtnTxt,

                size === 'xs' && styles.btnTxtSizeXS,
                size === 's' && styles.btnTxtSizeS,
                size === 'm' && styles.btnTxtSizeM,
                size === 'l' && styles.btnTxtSizeL,
                size === 'xl' && styles.btnTxtSizeXL
              ]}
            >
              {label}
            </Text>
            {isLoading ? <ActivityIndicator size='small' color={color}/> : (
              <View style={styles.btnIcon}>
                <IcoMoon name='arrow-right' size={18} color={color}/>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  type: PropTypes.oneOf(['default']),
  isDisabled: PropTypes.bool,
  showLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  width: PropTypes.number,
  height: PropTypes.number,
  isFullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'default',
  isDisabled: false,
  showLoading: false,
  size: 'm',
  width: 111111111,
  height: 111111111,
  isFullWidth: true
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10
  },
  btnContent: {
    display: 'flex',
    flexDirection: 'row'
  },
  btnTxt: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: FontFamily.primaryFont,
    flex: 3,
  },
  fullWidthBtn: {
    width: '100%'
  },
  disabledBtn: {
    opacity: 0.7
  },

  defaultBtn: {
    shadowColor: Colors.cyan,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    backgroundColor: Colors.white,
    elevation: 1
  },
  defaultBtnTxt: {
    color: Colors.cyan
  },

  btnSizeXS: {
    height: 30,
    paddingVertical: 7
  },
  btnTxtSizeXS: {
    fontSize: 12
  },
  btnSizeS: {
    height: 34,
    paddingVertical: 7
  },
  btnTxtSizeS: {
    fontSize: 13
  },
  btnSizeM: {
    height: 40,
    paddingVertical: 10
  },
  btnTxtSizeM: {
    fontSize: 15
  },
  btnSizeL: {
    height: 46,
    paddingVertical: 13
  },
  btnTxtSizeL: {
    fontSize: 16
  },
  btnSizeXL: {
    height: 54,
    paddingVertical: 15
  },
  btnTxtSizeXL: {
    fontSize: 16
  },


  btnIcon: {
    flex: 1,
    alignItems: 'flex-end'
  },
});