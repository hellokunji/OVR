/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase';
import {apiHost} from '../../config/config';
//import AsyncStorage from '@react-native-community/async-storage';
import {emailValidation, passwordValidation} from '../../utils/validation';
import {signUpStart, addFCMTokenStart} from '../../store/actions/auth';
import PageLayout from '../common/layout/page_layout';
import TextInput from '../common/input/textinput';
import Button from '../common/button/button';
import SocialButton from '../common/button/social_button';
import WebView from '../common/webview/login_webview';
import {Colors} from '../../config/theme';
import TextComponent from '../common/uncategorized/text';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      err: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      submitClick: false,

      webView: {
        show: false,
        uri: null,
        toggle: () => {}
      }
    };
    this.userType = props.navigation.getParam('userType').toLowerCase();
  }

  handleInputChange = (name, value) => {
    let {form} = this.state;
    form[name] = value;
    this.setState({form}, () => {
      if (this.state.submitClick) this.validate(name);
      else return true;
    });
  };

  validate = (name = 'all') => {
    let {err} = this.state;
    const {form} = this.state;

    if (name === 'all' || name === 'email') err.email = emailValidation(form.email).errMsg;
    if (name === 'all' || name === 'password') err.password = passwordValidation(form.password).errMsg;
    if (name === 'all' || name === 'firstName') err.firstName = form.firstName === '' ? 'Required' : '';
    if (name === 'all' || name === 'lastName') err.lastName = form.lastName === '' ? 'Required' : '';

    this.setState({err});
  };

  handleSubmit = e => {
    if (e) e.preventDefault();
    this.validate();
    this.setState({submitClick: true}, () => {
      const {form, err} = this.state;
      if (Object.keys(err).every(key => err[key] === '')) {
        let reqPayload = {
          user_data: {
            first_name: form.firstName,
            last_name: form.lastName,
            email_id: form.email.toLowerCase(),
            password: form.password,
            usage_role: this.userType === 'school' ? 'SCHOOL' : 'TEACHER'
          }
        };
        this.props.signUpStart(reqPayload);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.signUp !== nextProps.signUp) {
      if (nextProps.signUp.apiStatus === 'success') {
        this.setStorage(nextProps);
      }
    }
  }

  setStorage = async nextProps => {
    await AsyncStorage.setItem('accessToken', nextProps.token);
    await AsyncStorage.setItem('userId', nextProps.userId);
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) this.props.addFCMTokenStart({fcm_token: fcmToken});
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } else {
      try {
        await firebase.messaging().requestPermission();
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) this.props.addFCMTokenStart({fcm_token: fcmToken});
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } catch (error) {
        // User has rejected permissions
      }
      // user doesn't have permission
    }
    this.props.navigation.navigate('App');
  };

  toggleLinkedinPopup = () => {
    const webViewC = this.state.webView;
    let webView = this.state.webView;
    webView.show = !webViewC.show;
    webView.uri = !webViewC.show ? null : `${apiHost()}/auth/linkedin?usage_role=${this.userType === 'teacher' ? 'TEACHER' : 'SCHOOL'}`;
    webView.toggle = this.toggleLinkedinPopup;
    this.setState({webView});
  };

  toggleFacebookPopup = () => {
    const webViewC = this.state.webView;
    let webView = this.state.webView;
    webView.show = !webViewC.show;
    webView.uri = !webViewC.show ? null : `${apiHost()}/auth/facebook?usage_role=${this.userType === 'teacher' ? 'TEACHER' : 'SCHOOL'}`;
    webView.toggle = this.toggleFacebookPopup;
    this.setState({webView});
  };

  render() {
    const {form, err, webView} = this.state;

    const {signUp} = this.props;
    return (
      <PageLayout title={this.userType === 'teacher' ? 'It’s Really Simple' : `Let's Get Started`}>
        <View style={styles.signup}>
          <TextComponent style={styles.description} text={this.userType === 'teacher'
            ? 'Just a few more clicks and start swiping for jobs.'
            : 'Thousands of active job seekers are waiting to hear from you.'} fontWeight={'Light'}/>
          <View style={styles.email}>
            <View style={styles.inputItem}>
              <TextInput
                label={this.userType === 'teacher' ? 'First Name' : 'Recruiting Manager First Name'}
                value={form.firstName}
                onChange={value => this.handleInputChange('firstName', value)}
                hasError={err.firstName !== ''}
                errorText={err.firstName}
              />
            </View>
            <View style={styles.inputItem}>
              <TextInput
                label={this.userType === 'teacher' ? 'Last Name' : 'Recruiting Manager Last Name'}
                value={form.lastName}
                onChange={value => this.handleInputChange('lastName', value)}
                hasError={err.lastName !== ''}
                errorText={err.lastName}
              />
            </View>
            <View style={styles.inputItem}>
              <TextInput
                label='Email Address'
                value={form.email}
                onChange={value => this.handleInputChange('email', value)}
                hasError={err.email !== ''}
                errorText={err.email}
              />
            </View>
            <View style={styles.inputItem}>
              <TextInput
                label='Password'
                value={form.password}
                onChange={value => this.handleInputChange('password', value)}
                hasError={err.password !== ''}
                errorText={err.password}
                secureTextEntry={true}
              />
            </View>
            <View style={[styles.inputItem, styles.submitBtn]}>
              <Button
                onClick={this.handleSubmit}
                label='Sign Up'
                type='greyOutline'
                size='xl'
                isLoading={signUp.apiStatus === 'started'}
                isDisabled={signUp.apiStatus === 'started'}
              />
            </View>
          </View>
          <View style={styles.divider}>
            <View style={styles.line}/>
            <Text style={styles.dividerText}>OR</Text>
          </View>
          <View style={styles.social}>
            {/*<View style={styles.socialItem}>
              <SocialButton platform='wechat' label='Continue with Wechat' onClick={() => {
              }}/>
            </View>*/}
            <View style={styles.socialItem}>
              <SocialButton platform='linkedin' label='Continue with LinkedIn' onClick={this.toggleLinkedinPopup}/>
            </View>
            <View style={styles.socialItem}>
              <SocialButton platform='facebook' label='Continue with Facebook' onClick={this.toggleFacebookPopup}/>
            </View>
          </View>
        </View>

        {webView.show && (
          <WebView uri={webView.uri} onClose={webView.toggle}/>
        )}
      </PageLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    signUp: state.auth.signUp,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

export default withNavigation(connect(mapStateToProps, {signUpStart, addFCMTokenStart})(SignUp));

const styles = StyleSheet.create({
  signup: {
    paddingHorizontal: 20,
    paddingVertical: 0
  },
  description: {
    fontSize: 16,
    color: Colors.midGrey,
    marginBottom: 40
  },
  email: {},
  inputItem: {
    marginVertical: 10
  },
  submitBtn: {
    marginTop: 20
  },
  divider: {
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'visible',
    position: 'relative',
    marginVertical: 30
  },
  line: {
    height: 1,
    backgroundColor: Colors.lightGrey,
    width: 100
  },
  dividerText: {
    color: Colors.lightGrey,
    backgroundColor: Colors.white,
    width: 30,
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: -8
  },
  social: {},
  socialItem: {
    marginVertical: 6
  }
});
