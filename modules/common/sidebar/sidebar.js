/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity, Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {getProfileImg} from '../../../utils/helpers';
import {Colors} from '../../../config/theme';
import TextComponent from '../uncategorized/text';
import IcoMoon from '../uncategorized/icon';
import Button from '../button/button';
import ProgressBar from '../../common/uncategorized/progress_bar';
import styles from './sidebar_style';

class SideMenu extends Component {

  constructor(props) {
    super(props);
  }

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {

    const {getUser, getProfile} = this.props;

    if (getUser.data !== null && getProfile.data !== null) {

      const accountType = getUser.data.usage_role.toLowerCase();
      let userName = accountType === 'teacher' ? `${getUser.data.first_name} ${getUser.data.last_name}` : getProfile.data.school_name;

      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.head}>
              <Image style={styles.headImg} source={getProfileImg(getProfile.data.image_url, getProfile.data.gender, accountType)}/>
              <TextComponent style={styles.headTitle} text={userName}/>
            </View>
            <View style={styles.links}>
              <TouchableOpacity style={styles.link} onPress={() => this.navigateTo('MyProfile')}>
                <View style={styles.linkIcon}>
                  <IcoMoon name='profile' size={20} color={Colors.white}/>
                </View>
                <TextComponent style={styles.linkText} text='My Profile'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.link} onPress={() => this.navigateTo('SmartSearch')}>
                <View style={styles.linkIcon}>
                  <IcoMoon name='aim' size={20} color={Colors.white}/>
                </View>
                <TextComponent style={styles.linkText} text='Smart Search'/>
              </TouchableOpacity>
              {/*accountType === 'teacher' && (
                <TouchableOpacity style={styles.link}>
                  <View style={styles.linkIcon}>
                    <IcoMoon name='news' size={20} color={Colors.white}/>
                  </View>
                  <TextComponent style={styles.linkText} text='Applications'/>
                </TouchableOpacity>
              )*/}
              {accountType === 'school' && (
                <TouchableOpacity style={styles.link} onPress={() => this.navigateTo('CreateJob')}>
                  <View style={styles.linkIcon}>
                    <IcoMoon name='news' size={20} color={Colors.white}/>
                  </View>
                  <TextComponent style={styles.linkText} text='Job Postings'/>
                </TouchableOpacity>
              )}
              {/*accountType === 'school' && (
                <TouchableOpacity style={styles.link}>
                  <View style={styles.linkIcon}>
                    <IcoMoon name='list3' size={20} color={Colors.white}/>
                  </View>
                  <TextComponent style={styles.linkText} text='My Calendar'/>
                </TouchableOpacity>
              )*/}
              {/*accountType === 'teacher' && (
                <TouchableOpacity style={styles.checklistLink} onPress={() => this.navigateTo('Checklist')}>
                  <View style={styles.checklistBox}>
                    <View style={styles.linkIcon}>
                      <IcoMoon name='list3' size={20} color={Colors.white}/>
                    </View>
                    <TextComponent style={styles.linkText} text='Checklist'/>
                  </View>
                  <View style={styles.checklistStatus}>
                    <View style={styles.checklistBar}>
                      <ProgressBar progress={25} size='xs' theme='white'/>
                    </View>
                    <TextComponent style={styles.checklistLabel} text='25%'/>
                  </View>
                </TouchableOpacity>
              )*/}
              <TouchableOpacity style={styles.link} onPress={() => this.navigateTo('Settings')}>
                <View style={styles.linkIcon}>
                  <IcoMoon name='equalizer' size={20} color={Colors.white}/>
                </View>
                <TextComponent style={styles.linkText} text='Settings'/>
              </TouchableOpacity>
              {/*accountType === 'teacher' && (
                <TouchableOpacity style={styles.link}>
                  <View style={styles.linkIcon}>
                    <IcoMoon name='gift' size={20} color={Colors.white}/>
                  </View>
                  <TextComponent style={styles.linkText} text='Invite Friends'/>
                </TouchableOpacity>
              )*/}
              {/*accountType === 'school' && (
                <TouchableOpacity style={styles.link}>
                  <View style={styles.linkIcon}>
                    <IcoMoon name='gift' size={20} color={Colors.white}/>
                  </View>
                  <TextComponent style={styles.linkText} text='Invite'/>
                </TouchableOpacity>
              )*/}
              {/*accountType === 'school' && (
                <TouchableOpacity style={styles.link}>
                  <View style={styles.linkIcon}>
                    <IcoMoon name='truck' size={20} color={Colors.white}/>
                  </View>
                  <TextComponent style={styles.linkText} text='My Account'/>
                </TouchableOpacity>
              )*/}
              {/*accountType === 'school' && (
                <TouchableOpacity style={styles.link}>
                  <View style={styles.linkIcon}>
                    <IcoMoon name='lifebuoy' size={20} color={Colors.white}/>
                  </View>
                  <TextComponent style={styles.linkText} text='Help/FAQ'/>
                </TouchableOpacity>
              )*/}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            {/*accountType === 'school' && (
              <Button
                label='Upgrade'
                type='whiteOutline'
                isDisabled={false}
                showLoading={false}
                size='m'
                onClick={() => {
                }}
              />
            )*/}
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}/>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    getProfile: state.profile.getProfile,
    getUser: state.profile.getUser,
  }
};

export default withNavigation(connect(mapStateToProps, null)(SideMenu));