/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {WebView, Modal, View, StyleSheet, TouchableOpacity, SafeAreaView, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../../config/theme';
import IcoMoon from '../uncategorized/icon';
import GlobalStyle from '../../../config/global_style';

const CommonWebView = props => {
  const {uri, onClose} = props;
  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={true}
    >
      <SafeAreaView style={[GlobalStyle.droidSafeArea, styles.main]}>
        <View style={styles.box}>
          <WebView
            ref={ref => (this.webView = ref)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: uri}}
            style={{flex: 1}}
          />
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
              <IcoMoon name={'cross2'} color={Colors.darkGrey} size={20}/>
            </TouchableOpacity>
            <Text
              text={uri}
              style={styles.url}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {uri}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

CommonWebView.propTypes = {
  uri: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

CommonWebView.defaultProps = {};

export default CommonWebView;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    shadowColor: Colors.midGrey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingTop: 40,
  },
  header: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Colors.white,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    shadowColor: Colors.midGrey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingLeft: 25,
    paddingRight: 10,
    paddingVertical: 12,
  },
  closeButton: {
    borderRadius: 2,
    width: 30,
    height: 30,
    //backgroundColor: Colors.lightGrey,
    position: 'absolute',
    left: 10,
    top: 5,
    padding: 5,
    zIndex: 5
  },
  url: {
    width: '100%',
    paddingLeft: 25,
  },
});
