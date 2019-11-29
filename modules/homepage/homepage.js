/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import Button from '../common/button/button';
import {Colors, FontFamily, FontSize} from '../../config/theme';
import TextComponent from '../common/uncategorized/text';

class Homepage extends React.Component {

  render() {
    return (
      <View style={styles.homepage}>
        <ImageBackground style={styles.imgWrapper} source={require('../../static/img/home-bg.jpg')}>
          <View style={styles.box}>
            <View style={styles.boxContainer}>
              <View style={styles.head}>
                <TextComponent style={styles.headText} text='FOCUSED.' fontWeight={'Black'}/>
                <TextComponent style={styles.headText} text='FAST.' fontWeight={'Black'}/>
                <TextComponent style={styles.headText} text='FUN.' fontWeight={'Black'}/>
              </View>
              <View style={styles.action}>
                <View style={styles.actionItem}>
                  <Button
                    label="I'm looking for a job"
                    onClick={() => this.props.navigation.navigate('SignUp', {userType: 'teacher'})}
                    size='l'
                  />
                </View>
                <View style={styles.actionItem}>
                  <Button
                    label="I'm looking for talent"
                    onClick={() => this.props.navigation.navigate('SignUp', {userType: 'school'})}
                    size='l'
                  />
                </View>
                <View style={styles.actionItem}>
                  <TouchableOpacity style={styles.inlineBtn} onPress={() => this.props.navigation.navigate('SignIn')}>
                    <TextComponent style={styles.inlineBtnText} text='Sign In' fontWeight={'Medium'}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

export default withNavigation(connect(mapStateToProps, null)(Homepage));

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  homepage: {
    height,
    width
  },
  imgWrapper: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  boxContainer: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  head: {
    marginBottom: 70
  },
  headText: {
    fontSize: 48,
    color: Colors.white
  },
  action: {},
  actionItem: {
    marginVertical: 8
  },
  inlineBtn: {

  },
  inlineBtnText: {
    textAlign: 'center',
    color: Colors.white,
    textDecorationLine: 'underline',
    fontSize: FontSize.l
  }
});