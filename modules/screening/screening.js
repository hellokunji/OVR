/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ip from 'icepick';
import {updateProfileStart} from '../../store/actions/profile';
import {jobPostingQuestions} from '../../data/common';
import {isDataValid} from '../../utils/helpers';
import PopupLayout from '../common/layout/popup_layout';
import Question from '../create_job/question';
import {Colors} from '../../config/theme';

class ScreeningQuestion extends React.Component {

  constructor(props) {
    super(props);
    let preference = {
      background_check: false,
      relocation: false,
      education: false,
      certification: false,
      contract_length: false
    };
    if (isDataValid(props.getProfile.data.preference)) preference = {...props.getProfile.data.preference};
    this.state = {
      form: {
        bg_check: isDataValid(preference.background_check) ? preference.background_check : false,
        relocation: isDataValid(preference.relocation) ? preference.relocation : false,
        education: isDataValid(preference.education) ? preference.education : false,
        certification: isDataValid(preference.certification) ? preference.certification : false,
        citizenship: isDataValid(preference.citizenship) ? preference.citizenship : false,
        contract_length: isDataValid(preference.contract_length) ? preference.contract_length : false
      },
      err: {
        bg_check: '',
        relocation: '',
        education: '',
        certification: '',
        citizenship: '',
        contract_length: ''
      },

      submitClick: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updateProfile !== nextProps.updateProfile) {
      if (nextProps.updateProfile.apiStatus === 'success') {
        this.props.navigation.navigate('Explore')
      }
    }
  }

  handleInputChange = (name, value) => {
    let {form} = this.state;
    form[name] = value;
    this.setState({form});
  };

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    this.setState({submitClick: true}, () => {
      const {form, err} = this.state;
      if (Object.keys(err).every(key => err[key] === '')) {
        let reqPayload = {
          teacher: {
            preference: {
              background_check: form.bg_check,
              relocation: form.relocation,
              education: form.education,
              certification: form.certification,
              citizenship: form.citizenship,
              contract_length: form.contract_length
            }
          }
        };
        this.props.updateProfileStart(reqPayload);
      }
    });
  };

  render() {

    const {updateProfile} = this.props;
    const {form} = this.state;

    return (
      <PopupLayout
        pageTitle='Screening Questions'
        leftBtn={{
          show: true,
          label: 'Cancel',
          click: () => this.props.navigation.navigate('Explore')
        }}
        rightBtn={{
          show: true,
          label: 'Save',
          isLoading: updateProfile.apiStatus === 'started',
          isDisabled: updateProfile.apiStatus === 'started',
          click: this.handleSubmit
        }}
      >
        <View style={styles.main}>
          {jobPostingQuestions.map((item, index) => {
            return (
              <View style={[styles.inputItem, styles.inputQuestionItem]}>
                <Question
                  title={item.title}
                  description={item.description}
                  value={form[item.key]}
                  onChange={value => this.handleInputChange(item.key, value)}
                />
              </View>
            )
          })}
        </View>
      </PopupLayout>
    )
  }
}

const mapStateToProps = state => {
  let accountType = null;
  const {getUser} = state.profile;
  if (getUser.data !== null) accountType = getUser.data.usage_role;
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accountType,
    getProfile: ip.thaw(state.profile.getProfile),
    updateProfile: state.profile.updateProfile
  }
};

export default connect(mapStateToProps, {updateProfileStart})(ScreeningQuestion);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 10
  },
  inputQuestionItem: {
    paddingVertical: 10,
    marginVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey
  }
});