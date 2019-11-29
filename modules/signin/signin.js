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
import {emailValidation} from '../../utils/validation';
import {signInStart, facebookLoginStart, addFCMTokenStart} from '../../store/actions/auth';
import PageLayout from '../common/layout/page_layout';
import TextInput from '../common/input/textinput';
import Button from '../common/button/button';
import SocialButton from '../common/button/social_button';
import WebView from '../common/webview/login_webview';
import {Colors} from '../../config/theme';

//import {LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

class SignIn extends React.Component {

  state = {
    form: {
      email: '',
      password: ''
    },
    err: {
      email: '',
      password: ''
    },
    submitClick: false,

    webView: {
      show: false,
      uri: null,
      toggle: () => {
      }
    }
  };

  handleInputChange = (name, value) => {
    let {form} = this.state;
    form[name] = value;
    this.setState({form}, () => {
      if (this.state.submitClick) this.validate(name);
      else return true;
    });
  };

  validate = (name = 'all') => {
    let {form, err} = this.state;
    if (name === 'all' || name === 'email') err.email = emailValidation(form.email).errMsg;
    if (name === 'all' || name === 'password') err.password = form.password !== '' ? '' : 'Required';
    this.setState({err});
  };

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    this.validate();
    this.setState({submitClick: true}, () => {
      const {form, err} = this.state;
      if (Object.keys(err).every(key => err[key] === '')) {
        let reqPayload = {
          user_name: form.email.toLowerCase(),
          password: form.password
        };
        this.props.signInStart(reqPayload);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.signIn !== nextProps.signIn) {
      if (nextProps.signIn.apiStatus === 'success') {
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

  // handleFacebookLogin = () => {
  //   LoginManager.logInWithReadPermissions(["public_profile"]).then(
  //     (result) => {
  //       console.log('result', result);
  //       if (result.isCancelled) {
  //         console.log("Login cancelled");
  //       } else {
  //         this.initFBLogin();
  //         console.log(
  //           "Login success with permissions: " +
  //           result.grantedPermissions.toString()
  //         );
  //       }
  //     },
  //     function(error) {
  //       console.log("Login fail with error: " + error);
  //     }
  //   );
  // };
  //
  // initFBLogin = () => {
  //
  //   const infoRequest = new GraphRequest(
  //     '/me?fields=email,name,friends',
  //     null,
  //     this._responseInfoCallback,
  //   );
  //
  //   AccessToken.getCurrentAccessToken().then(
  //     (data) => {
  //       let token = data.accessToken.toString();
  //       console.log(token);
  //       this.props.facebookLoginStart(`${apiHost()}/auth/facebook/callback?code=${token}`);
  //       //new GraphRequestManager().addRequest(infoRequest).start();
  //     }
  //   )
  // };
  //
  // _responseInfoCallback(error, result) {
  //   if (error) {
  //     console.log('Error fetching data: ', error);
  //   } else {
  //     console.log('Success fetching data: ', result);
  //   }
  // }

  toggleLinkedinPopup = () => {
    const webViewC = this.state.webView;
    let webView = this.state.webView;
    webView.show = !webViewC.show;
    webView.uri = !webViewC.show ? null : `${apiHost()}/auth/linkedin`;
    webView.toggle = this.toggleLinkedinPopup;
    this.setState({webView});
  };

  toggleFacebookPopup = () => {
    const webViewC = this.state.webView;
    let webView = this.state.webView;
    webView.show = !webViewC.show;
    webView.uri = !webViewC.show ? null : `${apiHost()}/auth/facebook`;
    webView.toggle = this.toggleFacebookPopup;
    this.setState({webView});
  };

  render() {
    const {form, err, webView} = this.state;
    const {signIn} = this.props;
    return (
      <PageLayout title='Welcome Back'>
        <View style={styles.main}>
          <View style={styles.email}>
            <View style={styles.inputItem}>
              <TextInput
                label='Email address'
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
                label='Sign In'
                type='greyOutline'
                size='xl'
                isLoading={signIn.apiStatus === 'started'}
                isDisabled={signIn.apiStatus === 'started'}
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
    signIn: state.auth.signIn,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

export default withNavigation(connect(mapStateToProps, {
  signInStart,
  facebookLoginStart,
  addFCMTokenStart
})(SignIn));

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20
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
