/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Button from './button';
import {Colors} from '../../../config/theme';

const SocialButton = props => {
  let imgSrc = '',
    color = '';
  if (props.platform === 'facebook') {
    imgSrc = require('../../../static/img/icons/facebook.png');
    color = Colors.facebook;
  }
  else if (props.platform === 'wechat') {
    imgSrc = require('../../../static/img/icons/wechat.png');
    color = Colors.weChat;
  }
  else if (props.platform === 'linkedin') {
    imgSrc = require('../../../static/img/icons/linkedin.png');
    color = Colors.linkedIn;
  }
  return (
    <TouchableOpacity style={[styles.main, {backgroundColor: color}]}
                      onPress={props.onClick} type='greyOutline' size='xl'>
      <View style={styles.socialBtn}>
        <Image style={styles.socialIcon} source={imgSrc}/>
        <Text style={[styles.socialBtnLabel]}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  )
};

SocialButton.propTypes = {
  platform: PropTypes.oneOf(['facebook', 'wechat', 'linkedin']).isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

SocialButton.defaultProps = {};

export default SocialButton;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.facebook,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10
  },
  socialBtn: {
    marginTop: -3,
    width: '100%',
    position: 'relative'
  },
  socialIcon: {
    width: 35,
    height: 35,
    position: 'absolute',
    left: 0,
    top: 0
  },
  socialBtnLabel: {
    fontSize: 16,
    paddingLeft: 10,
    textAlign: 'center',
    marginTop: 4,
    color: Colors.white,
    paddingTop: 4
  }
});