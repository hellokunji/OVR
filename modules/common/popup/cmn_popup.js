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
  Modal,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import TextComponent from '../../common/uncategorized/text';
import {Colors} from '../../../config/theme';

const CommonPopup = props => {
  const {visible, title, description, leftBtn, rightBtn} = props;
  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={visible}
    >
      <View style={styles.main}>
        <View style={styles.box}>
          <View style={styles.content}>
            {title && <TextComponent text={title} style={styles.title}/>}
            {description && <TextComponent text={description} style={styles.description}/>}
          </View>
          {props.children && <React.Fragment>{props.children}</React.Fragment> }
          <View style={styles.action}>
            {leftBtn.show && (
              <TouchableOpacity style={[styles.btn, styles.leftBtn]} onPress={leftBtn.onClick}>
                <TextComponent style={styles.leftBtnTexts} text={leftBtn.label}/>
              </TouchableOpacity>
            )}
            {rightBtn.show && (
              <TouchableOpacity style={[styles.btn, styles.rightBtn]} onPress={rightBtn.onClick}>
                <TextComponent style={styles.rightBtnTexts} text={rightBtn.label}/>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
};

CommonPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  leftBtn: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func
  }),
  rightBtn: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func
  })
};

CommonPopup.defaultProps = {
  leftBtn: {
    show: true,
    label: 'No',
    onClick: null
  },
  rightBtn: {
    show: true,
    label: 'Yes',
    onClick: null
  }
};

export default CommonPopup;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: Colors.white,
    maxWidth: 350,
    width: '90%',
    borderRadius: 10,
    shadowColor: Colors.midGrey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: Colors.midGrey
  },
  action: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    paddingVertical: 15
  },
  leftBtn: {},
  rightBtn: {
    backgroundColor: Colors.cyan
  },
  leftBtnTexts: {
    textAlign: 'center',
    fontSize: 16
  },
  rightBtnTexts: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.white
  }
});