/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getUserStart, getProfileStart} from '../../../store/actions/profile';
import {getJobStart} from '../../../store/actions/job';
import {Colors} from '../../../config/theme';

class AuthMiddle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchStartApi(this.props);
  }

  fetchStartApi = props => {
    const {isAuthenticated, getUser} = props;

    if (isAuthenticated) {
      if (getUser.data === null && getUser.apiStatus !== 'started') this.props.getUserStart();
      //if (getUser.data === null && getUser.apiStatus !== 'started') this.props.getProfileStart();
    }
  };

  fetchJobApi = (props = this.props) => {
    const {getUser, getJob} = props;
    if (getUser.data.usage_role.toLowerCase() === 'school') {
      if (getJob.data === null && getJob.apiStatus !== 'started') this.props.getJobStart();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.getUser.apiStatus === 'success') {
        this.fetchJobApi(nextProps);
        let isCompleted = false;
        if (nextProps.getProfile.apiStatus === 'success') {
          //console.log('inside get profile');
          //console.log('nextProps.getProfile.data.is_completed', nextProps.getProfile.data.is_completed);
          if (nextProps.getProfile.data.is_completed !== undefined) isCompleted = nextProps.getProfile.data.is_completed;
        }

        let screenName = null;
        if (isCompleted) {
          if (nextProps.getUser.data.usage_role.toLowerCase() === 'school') {
            if (nextProps.getJob.apiStatus === 'success') screenName = 'Explore';
          }
          else {
            screenName = 'Explore';
          }
        }
        else {
          screenName = 'Onboarding';
        }
        if (screenName !== null) this.props.navigation.navigate(screenName);
      }
      else {
        //this.fetchStartApi(nextProps);
      }
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <ActivityIndicator color={Colors.darkGrey} size={'large'}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    getUser: state.profile.getUser,
    getProfile: state.profile.getProfile,
    getJob: state.job.getJob
  }
};

export default withNavigation(connect(mapStateToProps, {getUserStart, getProfileStart, getJobStart})(AuthMiddle));

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    height,
    width
  }
});