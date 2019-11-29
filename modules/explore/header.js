/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import {getProfileImg} from '../../utils/helpers';
import IcoMoon from '../common/uncategorized/icon';
import {Colors} from '../../config/theme';

const Header = props => {
  return (
    <View style={styles.main}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.profilePicBox}
                          onPress={() => props.navigation.openDrawer()}>
          <Image style={styles.profilePic}
                 source={props.imgSrc}/>
        </TouchableOpacity>
      </View>
      <View style={styles.mid}>
        <View style={styles.itemBox}>
          {props.accountType === 'teacher' && (
            <View style={styles.item}>
              <TouchableOpacity style={styles.itemBtn}>
                <IcoMoon name='star' size={18}/>
              </TouchableOpacity>
            </View>
          )}
          {props.accountType === 'teacher' && (
            <View style={styles.item}>
              <TouchableOpacity style={styles.itemBtn}
                                onPress={() => props.navigation.navigate('SmartSearch')}>
                <IcoMoon name='aim' size={18}/>
              </TouchableOpacity>
            </View>
          )}
          {props.accountType === 'teacher' && (
            <View style={[styles.item, {borderRightColor: 'transparent'}]}>
              <TouchableOpacity style={styles.itemBtn}>
                <IcoMoon name='news' size={18}/>
              </TouchableOpacity>
            </View>
          )}
          {props.accountType === 'school' && (
            <View style={styles.item}>
              <TouchableOpacity style={styles.itemBtn}>
                <IcoMoon name='users2' size={18}/>
              </TouchableOpacity>
            </View>
          )}
          {props.accountType === 'school' && (
            <View style={styles.item}>
              <TouchableOpacity style={styles.itemBtn}
                                onPress={() => props.navigation.navigate('SmartSearch')}>
                <IcoMoon name='aim' size={18}/>
              </TouchableOpacity>
            </View>
          )}
          {props.accountType === 'school' && (
            <View style={[styles.item, {borderRightColor: 'transparent'}]}>
              <TouchableOpacity style={styles.itemBtn}>
                <IcoMoon name='news' size={18}/>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.rightBtn} onPress={() => props.navigation.navigate('NewMatches')}>
          <IcoMoon name='bubbles' size={24}/>
          {(props.unreadMsg.data !== null && props.unreadMsg.data !== 0) && (
            <View style={styles.count}>
              <Text style={styles.countText}>{props.unreadMsg.data}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
};

const mapStateToProps = state => {
  let accountType = null;
  const {getUser, getProfile} = state.profile;
  if (getUser.data !== null) accountType = getUser.data.usage_role.toLowerCase();

  return {
    accountType,
    imgSrc: getProfileImg(getProfile.data.image_url, getProfile.data.gender, accountType),
    unreadMsg: state.directMessage.unreadMsg
  }
};

export default withNavigation(connect(mapStateToProps, null)(Header));

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: '100%',
    flex: 1
  },

  left: {
    flex: 1,
    justifyContent: 'center'
  },
  profilePicBox: {
    alignSelf: 'flex-start'
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20
  },

  mid: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemBox: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 30,
    flexDirection: 'row',
    width: 130
  },
  item: {
    width: '33.33%',
    height: 35,
    borderRightWidth: 1,
    borderRightColor: Colors.lightGrey
  },
  itemBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  right: {
    flex: 1,
    justifyContent: 'center'
  },
  rightBtn: {
    alignSelf: 'flex-end',
    position: 'relative'
  },
  count: {
    backgroundColor: Colors.red,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: 'absolute',
    top: 0,
    right: -5
  },
  countText: {
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    fontSize: 11
  }
});