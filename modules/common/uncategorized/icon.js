/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../../static/fonts/selection.json';
import {Colors} from '../../../config/theme';

const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon');

const IcoMoon = props => {
  return (
    <Text>
      <Icon
        name={props.name}
        size={props.size}
        color={props.color}
      />
    </Text>
  );
};

IcoMoon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string
};

IcoMoon.defaultProps = {
  size: 16,
  color: Colors.darkGrey
};

export default IcoMoon;

