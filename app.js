/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StatusBar, YellowBox, AsyncStorage, AppState} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';

import store from './store/store';
import {setAuthHeaders} from './utils/api';
import {AUTH_USER} from './store/action_types';
import AppNav from './routes';
import Toast from './modules/common/toast/toast';
import {Colors} from './config/theme';

YellowBox.ignoreWarnings(['Remote debugger']);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isStoreLoaded: false,

      appState: AppState.currentState,
    };
  }

  componentWillMount() {
    this.checkAsyncStorage();
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log('nextAppState', nextAppState);
    console.log('appState', nextAppState);
    if (
      this.state.appState.match(/active/) &&
      nextAppState === 'inactive' || nextAppState === 'background'
    ) {
      //global.chatClient = undefined;
      //global.channel = undefined;
    }
    this.setState({appState: nextAppState});
  };

  checkAsyncStorage = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const userId = await AsyncStorage.getItem('userId');

    if (accessToken) {
      store.dispatch({type: AUTH_USER, payload: {accessToken, userId}});
      setAuthHeaders(accessToken);
    }
    this.setState({isStoreLoaded: true})
  };

  render() {
    return (
      <View style={{backgroundColor: Colors.white, flex: 1}}>
        <StatusBar backgroundColor='transparent' translucent barStyle='dark-content'/>
        {this.state.isStoreLoaded && (
          <Provider store={store}>
            <AppNav/>
            <Toast/>
          </Provider>
        )}
      </View>
    )
  }
}

export default App;

