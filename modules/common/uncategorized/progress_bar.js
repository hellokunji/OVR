/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../../config/theme';

const Progress = props => {
  return (
    <View style={[
      styles.progressBar,
      props.theme === 'default' && styles.themeDefault,
      props.theme === 'white' && styles.themeWhite,
      props.size === 'xs' && styles.sizeXS,
      props.size === 's' && styles.sizeS,
      props.size === 'm' && styles.sizeM,
    ]}>
      <View style={[
        styles.filled,
        props.theme === 'default' && styles.filledThemeDefault,
        props.theme === 'white' && styles.filledThemeWhite,
        {width: `${props.progress}%`}
      ]}/>
    </View>
  )
};

Progress.propTypes = {
  theme: PropTypes.oneOf(['default', 'white']),
  size: PropTypes.oneOf(['xs', 's', 'm']),
  progress: PropTypes.number.isRequired,
  width: PropTypes.string
};

Progress.defaultProps = {
  size: 'm',
  theme: 'default',
  width: '100%'
};

export default Progress;

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    borderRadius: 10
  },
  themeDefault: {
    backgroundColor: 'rgba(43, 183, 179, 0.3)'
  },
  filledThemeDefault: {
    backgroundColor: Colors.cyan
  },
  themeWhite: {
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  filledThemeWhite: {
    backgroundColor: Colors.white
  },
  sizeXS: {
    height: 5
  },
  sizeS: {
    height: 7
  },
  sizeM: {
    height: 9
  },
  filled: {
    position: 'absolute',
    height: '100%',
    borderRadius: 15
  }
});