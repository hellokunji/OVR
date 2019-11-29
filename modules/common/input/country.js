/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {getCountriesStart} from '../../../store/actions/misc';
import ip from 'icepick';
import PropTypes from 'prop-types';
import DropDown from './dropdown';

class Country extends React.Component {

  componentWillMount() {
    const {getCountries, getCountriesStart} = this.props;
    if (getCountries.apiStatus !== 'success') getCountriesStart();
  }

  render() {
    const {getCountries} = this.props;
    return (
      <DropDown
        {...this.props}
        options={getCountries.apiStatus !== 'success' ? [] : getCountries.data}
        isLoading={getCountries.apiStatus !== 'success'}
      />
    )
  }
}

Country.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  excludeOptions: PropTypes.array
};

Country.defaultProps = {
  placeholder: 'Nationality',
  label: '',
  excludeOptions: []
};

const mapStateToProps = state => {
  return {
    getCountries: ip.thaw(state.misc.getCountries)
  }
};

export default connect(mapStateToProps, {getCountriesStart})(Country);