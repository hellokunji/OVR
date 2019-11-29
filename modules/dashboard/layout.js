/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import PageLayout from '../common/layout/page_layout';
import TextComponent from '../common/uncategorized/text';
import {Colors} from '../../config/theme';

const Layout = props => {
  return (
    <PageLayout title={'Dashboard'} style='inline' backTo='Explore'>
      <View style={styles.main}>
        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('NewMatches')}
            style={[styles.link]}>
            <TextComponent
              text='New Matches'
              style={[styles.linkText, props.pageFor === 'newMatches' && styles.activeLinkText]}
              fontWeight={props.pageFor === 'newMatches' ? 'Medium' : 'Light'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Messages')}
            style={[styles.link]}>
            <TextComponent
              text='Messages'
              style={[styles.linkText,
              props.pageFor === 'messages' && styles.activeLinkText]}
              fontWeight={props.pageFor === 'messages' ? 'Medium' : 'Light'}
            />
            {(props.unreadMsg.data !== null && props.unreadMsg.data !== 0) && (
              <View style={styles.alertBox}>
                <TextComponent text={props.unreadMsg.data} style={styles.alert}/>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.head}>
            <TextComponent
              style={styles.headText}
              text={props.pageFor === 'newMatches' ? 'New Matches' : 'Messages'}
              fontWeight={'Medium'}
            />
          </View>
          <View style={styles.body}>
            {props.children}
          </View>
        </View>
      </View>
    </PageLayout>
  )
};

const mapStateToProps = state => {
  return {
    unreadMsg: state.directMessage.unreadMsg
  }
};



export default withNavigation(connect(mapStateToProps, null)(Layout));

const styles = StyleSheet.create({
  main: {},

  nav: {
    flexDirection: 'row',
    display: 'flex',
    paddingHorizontal: 20,
    marginTop: 10
  },
  link: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  activeLink: {
    fontWeight: '400'
  },
  linkText: {
    fontSize: 17,
    textAlign: 'left',
    color: Colors.cyan
  },
  activeLinkText: {},
  alertBox: {
    backgroundColor: Colors.cyan,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    marginLeft: 5
  },
  alert: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13
  },

  container: {
    marginTop: 20
  },
  head: {
    paddingHorizontal: 20
  },
  headText: {
    fontSize: 20,
    fontWeight: '800'
  },

  body: {}
});