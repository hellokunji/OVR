/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {getCurrenciesStart} from '../../../store/actions/misc';
import PropTypes from 'prop-types';
import DropDown from './dropdown';

class Currency extends React.Component {

  componentWillMount() {
    const {getCurrencies, getCurrenciesStart} = this.props;
    if (getCurrencies.apiStatus !== 'success') getCurrenciesStart();
  }

  formatData = () => {
    /*const currencies = this.props.getCurrencies.data;

    let currencyArr = [];
    let currencyIter = 0, currencyLen = currencies.length;
    for (currencyIter; currencyIter < currencyLen; currencyIter++) {
      currencyArr.push({name: `${currencies[currencyIter].code} - ${currencies[currencyIter].name}`});
    }

    return currencyArr;*/
    return [{name: 'CNY'}];
  };

  render() {
    const {getCurrencies} = this.props;
    return (
      <DropDown
        {...this.props}
        options={getCurrencies.apiStatus !== 'success' ? [] : this.formatData()}
        isLoading={getCurrencies.apiStatus !== 'success'}
      />
    )
  }
}

Currency.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string
};

Currency.defaultProps = {
  placeholder: 'Currency',
  label: ''
};

const mapStateToProps = state => {
  return {
    getCurrencies: state.misc.getCurrencies
  }
};

export default connect(mapStateToProps, {getCurrenciesStart})(Currency);