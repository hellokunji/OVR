/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {getConnectionStart, resetConnection} from '../../store/actions/connection';
import {getProfileImg, isDataValid, getFirstLine, getSecondLine} from '../../utils/helpers';
import Layout from './layout';
import InlineLoader from '../common/loader/inline_loader';
import IcoMoon from '../common/uncategorized/icon';
import {FontFamily} from '../../config/theme';

class NewMatches extends React.Component {

  componentWillMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', this.componentDidFocus),
      this.props.navigation.addListener('willBlur', this.componentWillBlur),
    ];
  }

  componentDidFocus = () => {
    this.fetchData();
  };

  componentWillBlur = () => {
    this.props.resetConnection();
  };

  fetchData = () => {
    const {accountType, getJob, userId} = this.props;
    if (accountType === 'teacher') {
      this.props.getConnectionStart({profileId: userId});
    }
    else {
      if (getJob.data !== null) {
        for (let iter = 0; iter < getJob.data.length; iter++) {
          this.props.getConnectionStart({profileId: getJob.data[iter].id});
        }
      }
    }
  };

  getChannelName = item => {
    const userId = item.profileId.replace( /\D+/g, '');
    const peerId = item.id.replace( /\D+/g, '');

    let channelName;
    if(parseInt(userId)>parseInt(peerId)){
      channelName = `${item.profileId}+${item.id}`;
    }
    else{
      channelName = `${item.id}+${item.profileId}`;
    }
    return channelName;
  };

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {

    const {getConnection, accountType} = this.props;

    return (
      <Layout pageFor='newMatches'>
        {(isDataValid(getConnection.data) && getConnection.apiStatus !== 'started') ? (
          <View style={styles.main}>
            <FlatList
              data={getConnection.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                let channelUniqueName = this.getChannelName(item);
                return (
                  <TouchableOpacity style={styles.card} 
                    onPress={() => this.props.navigation.navigate('Chat', {
                        peerId: accountType === 'teacher' ? item.school_profile_id : item.id,
                        uniqueName: channelUniqueName
                      })}>
                    <View style={styles.info}>
                      <Image style={styles.profilePic}
                             source={getProfileImg(item.image_url, item.gender, accountType === 'school' ? 'teacher' : 'school')}/>
                      <View style={styles.details}>
                        <Text style={styles.title}
                              numberOfLines={1}
                              ellipsizeMode='tail'>
                          {getFirstLine(item, accountType)}
                        </Text>
                        <Text style={styles.subtitle}
                              numberOfLines={1}
                              ellipsizeMode='tail'>
                          {getSecondLine(item, accountType)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.action}>
                      <TouchableOpacity>
                        <IcoMoon name='bubble-text'/>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        ) : <InlineLoader/>}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  let accountType = null;
  const {getUser} = state.profile;
  if (getUser.data !== null) accountType = getUser.data.usage_role.toLowerCase();
  return {
    accountType,
    getConnection: state.connection.getConnection,
    userId: state.auth.userId,
    getJob: state.job.getJob
  }
};

export default connect(mapStateToProps, {getConnectionStart, resetConnection})(NewMatches);

const {width} = Dimensions.get('screen');
const horizontalPadding = 20;
const actionWidth = 90;
const styles = StyleSheet.create({
  main: {
    paddingTop: 10
  },
  card: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalPadding
  },
  info: {
    width: width - horizontalPadding * 2 - actionWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePic: {
    width: 51,
    height: 51,
    borderRadius: 26
  },
  details: {
    paddingLeft: 10
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.primaryFont
  },
  subtitle: {
    fontSize: 12,
    fontFamily: FontFamily.primaryFont
  },
  action: {
    width: actionWidth,
    alignItems: 'flex-end'
  }
});