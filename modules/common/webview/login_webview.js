/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React, {Component} from 'react';
import {WebView, Modal, View, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import {setAuthHeaders} from '../../../utils/api';
import {AUTH_USER} from '../../../store/action_types';
import {toastUpdate} from '../../../store/actions/layout';
import {addFCMTokenStart} from '../../../store/actions/auth';
import {Colors} from '../../../config/theme';
import IcoMoon from '../uncategorized/icon';

class MyWeb extends Component {

  onLoad = () => {
    this.webView.injectJavaScript = 'WebStorage.deleteAllData()';
    setInterval(() => {
      this.props.onClose();
    }, 120000);
  };

  onMessage = event => {
    const authData = event.nativeEvent.data;
    //console.log('On Message', authData);
    if (authData !== null && authData !== undefined && authData !== '') {
      if (authData === 'unauthenticated') {
        this.props.toastUpdate({
          show: true,
          type: 'error',
          content: {
            title: 'Failure', description: "We couldn't find an account with this id, Go to signup page to create one."
          },
          interval: 10000
        });
        this.props.onClose();
      }
      else if (authData === 'unauthenticated2') {
        this.props.toastUpdate({
          show: true,
          type: 'error',
          content: {
            title: 'Failure', description: "We already have an account with this id, Go to login page for signin."
          },
          interval: 10000
        });
        this.props.onClose();
      }
      else {
        this.props.onClose();
        const accessToken = authData.split('----')[0];
        const userId = authData.split('----')[1];
        setAuthHeaders(accessToken);
        this.props.signInUser(accessToken, userId);
        this.setStorage(accessToken, userId);
      }
    }
  };

  setStorage = async (accessToken, userId) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('userId', userId);
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      this.props.addFCMTokenStart({fcm_token: fcmToken});
    } else {}
    this.props.navigation.navigate('App');
  };

  render() {
    const {uri, onClose} = this.props;
    return (
      <Modal
        transparent={true}
        animationType='fade'
        visible={true}
      >
        <View style={styles.main}>
          <View style={styles.box}>
            <WebView
              ref={ref => (this.webView = ref)}
              injectedJavaScript={'WebStorage.deleteAllData()'}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{uri: uri}}
              style={{flex: 1}}
              onMessage={this.onMessage}
              onLoad={this.onLoad}
            />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <IcoMoon name={'cross2'} color={Colors.red}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

MyWeb.propTypes = {
  uri: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

MyWeb.defaultProps = {

};

const mapStateToProps = state => {
  return {
    signIn: state.auth.signIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (accessToken, userId) => {
      dispatch({
        type: AUTH_USER,
        payload: {
          accessToken,
          userId
        }
      });
    },
    toastUpdate: payload => {
      dispatch(toastUpdate(payload));
    },
    addFCMTokenStart: payload => {
      dispatch(addFCMTokenStart(payload));
    }
  }
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MyWeb));

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: Colors.white,
    width: '92%',
    height: '80%',
    borderRadius: 10,
    shadowColor: Colors.midGrey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  closeButton: {
    position: 'absolute',
    right: 6,
    top: 6,
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: 30,
    height: 30,
    padding: 7,
    shadowColor: Colors.midGrey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5
  }
});