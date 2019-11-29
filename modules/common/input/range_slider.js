/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Colors} from '../../../config/theme';

class RangeSlider extends React.Component {
  render() {

    const {minRange, maxRange, minValue, maxValue, onChange, sliderLength} = this.props;

    return (
      <MultiSlider
        values={[
          minValue,
          maxValue
        ]}
        sliderLength={sliderLength}
        onValuesChange={values => onChange({minValue: values[0], maxValue: values[1]})}
        min={minRange}
        max={maxRange}
        step={1}
        allowOverlap
        snapped
        trackStyle={{
          height: 4,
          backgroundColor: Colors.lightGrey,
        }}
        selectedStyle={{
          backgroundColor: Colors.cyan
        }}
        customMarker={CustomMarker}
      />
    )
  }
}

RangeSlider.propTypes = {
  minRange: PropTypes.number.isRequired,
  maxRange: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  sliderLength: PropTypes.number
};

RangeSlider.defaultProps = {
  sliderLength: 200
};

export default RangeSlider;

const CustomMarker = props => {
  return (
    <TouchableOpacity style={{backgroundColor: Colors.cyan, width: 27, height: 27, borderRadius: 14}}/>
  );
};
