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
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions, Platform
} from 'react-native';
import PropTypes from 'prop-types';
import {getBottomUnsafePadding, getUnsafePadding} from '../../utils/native_app';
import ActionBar from './action_bar';
import LongProfileContent from './long_profile_content';
import {Colors} from '../../config/theme';
import GlobalStyle from '../../config/global_style';

class LongProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {profile, visible, usageRole} = this.props;
    return (
      <Modal
        transparent={false}
        animationType='fade'
        visible={visible}
      >
        <SafeAreaView style={[GlobalStyle.droidSafeArea]}>
          <View style={styles.main}>
            <ScrollView style={styles.content}>
              <LongProfileContent profile={profile} usageRole={usageRole}/>
            </ScrollView>

            <View style={styles.action}>
              <ActionBar
                pressUndo={this.props.pressUndo}
                pressView={this.props.pressView}
                pressSuperLike={this.props.pressSuperLike}
                pressLike={this.props.pressLike}
                pressBoost={this.props.pressBoost}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
}

LongProfile.propTypes = {
  visible: PropTypes.bool.isRequired,
  profile: PropTypes.string.isRequired,
  usageRole: PropTypes.string.isRequired
};

LongProfile.defaultProps = {

};

export default LongProfile;

const {height} = Dimensions.get('screen');
const actionHeight = 60;
const styles = StyleSheet.create({
  main: {
    height,
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.white
  },

  content: {
    height: height - actionHeight - (Platform.OS === 'android' ? 70 : getUnsafePadding())
  },

  action: {
    position: 'absolute',
    height: actionHeight,
    bottom: getBottomUnsafePadding(),
    width: '100%',
    zIndex: 5
  }
});

