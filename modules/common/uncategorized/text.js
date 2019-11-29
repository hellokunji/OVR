/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {FontFamily, Colors} from '../../../config/theme';

const TextComponent = props => {
  const {text, style, fontFamily, fontWeight} = props;
  let customStyle = {};

  customStyle.color = Colors.darkGrey;
  customStyle.fontFamily = FontFamily[`${fontFamily}Font${fontWeight}`];

  return (
    <Text style={[customStyle, style]} {...this.props}>
      {text}
    </Text>
  )
};

TextComponent.propTypes = {
  text: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fontFamily: PropTypes.oneOf(['primary', 'secondary']),
  fontWeight: PropTypes.oneOf(['Thin', 'Light', 'Regular', 'Medium', 'Bold', 'Black'])
};

TextComponent.defaultProps = {
  text: '',
  style: {},
  fontFamily: 'primary',
  fontWeight: 'Light'
};

export default TextComponent;

