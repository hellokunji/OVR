/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getUnsafePadding} from '../../../utils/native_app';
import TextComponent from '../uncategorized/text';
import GlobalStyle from '../../../config/global_style'
import {Colors} from '../../../config/theme';

const PopupLayout = props => {
    const { children, leftBtn, rightBtn, pageTitle } = props;

    return (
      <SafeAreaView style={[GlobalStyle.droidSafeArea, styles.main]}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={false}>
        <ScrollView style={styles.content}>
          <View style={styles.head}>
            <TextComponent text={pageTitle} style={styles.headText} fontWeight='Black'/>
          </View>
          <View style={styles.body}>
            {children}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.leftBtnBox}>
          {leftBtn.show && (
            <TouchableOpacity style={styles.leftBtn} onPress={leftBtn.click}>
              {leftBtn.isLoading ? (
                <ActivityIndicator/>
              ) : (
                <TextComponent style={styles.btnText} text={leftBtn.label} size={'small'}/>
              )}
            </TouchableOpacity>
          )}
          </View>
          <View style={styles.rightBtnBox}>
          {rightBtn.show && (
            <TouchableOpacity style={styles.rightBtn} onPress={rightBtn.click}>
              {rightBtn.isLoading ? (
                <ActivityIndicator/>
              ) : (
                <TextComponent style={styles.btnText} text={rightBtn.label} size={'small'}/>
              )}
            </TouchableOpacity>
          )}
          </View>
        </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
};

PopupLayout.propTypes = {
  pageTitle: PropTypes.string,
  leftBtn: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    click: PropTypes.func
  }),
  rightBtn: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    click: PropTypes.func
  })
};

PopupLayout.defaultProps = {
  pageTitle: '',
  leftBtn: {
    label: null,
    show: false,
    isDisabled: false,
    isLoading: false,
    click: null
  },
  rightBtn: {
    label: null,
    show: false,
    isDisabled: false,
    isLoading: false,
    click: null
  }
};

export default PopupLayout;

const {width, height} = Dimensions.get('window');
const contentHeight = height - (Platform.OS === 'android' ? getUnsafePadding() : getUnsafePadding());
const styles = StyleSheet.create({
  main: {
    flex: 1,
    height,
    width
  },
  content: {
    flex: 1,
    height: contentHeight
  },
  head: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  headText: {
    fontSize: 36
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 50
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    height: 50,
    flexDirection: 'row',
    display: 'flex',
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1
  },
  leftBtnBox: {
    flex: 1
  },
  leftBtn: {
    alignSelf: 'flex-start',
    height: '100%',
    justifyContent: 'center'
  },
  rightBtnBox: {

  },
  rightBtn: {
    alignSelf: 'flex-end',
    height: '100%',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 16
  }
});