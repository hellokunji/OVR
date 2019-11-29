/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {getCitiesStart} from '../../../store/actions/misc';
import PropTypes from 'prop-types';
import DropDown from './dropdown';

class City extends React.Component {

  componentWillMount() {
    const {getCities, getCitiesStart} = this.props;
    if (getCities.apiStatus !== 'success') getCitiesStart();
  }

  formatData = () => {
    const cities = this.props.getCities.data;
    const chinaIndex = cities.findIndex(item => item.country_name === 'China');
    const chinaCities = cities[chinaIndex].city_list;

    let cityArr = [];
    let cityIter = 0, cityLen = chinaCities.length;
    for (cityIter; cityIter < cityLen; cityIter++) {
      cityArr.push({name: chinaCities[cityIter]});
    }

    return cityArr;
  };

  render() {
    const {getCities} = this.props;
    return (
      <DropDown
        {...this.props}
        options={getCities.apiStatus !== 'success' ? [] : this.formatData()}
        isLoading={getCities.apiStatus !== 'success'}
      />
    )
  }
}

City.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string
};

City.defaultProps = {
  placeholder: 'City',
  label: ''
};

const mapStateToProps = state => {
  return {
    getCities: state.misc.getCities
  }
};

export default connect(mapStateToProps, {getCitiesStart})(City);