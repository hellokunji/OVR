/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import PageLayout from '../common/layout/page_layout';
import IcoMoon from '../common/uncategorized/icon';
import {Colors} from '../../config/theme';
import TextComponent from "../common/uncategorized/text";

class JobPosting extends React.Component {

  render() {
    return (
      <PageLayout title='Job Postings' backTo='Explore'>
        <View style={styles.main}>
          <TouchableOpacity style={styles.add}
                            onPress={() => this.props.navigation.navigate('CreateJob')}>
            <View style={styles.addIcon}>
              <IcoMoon name='pencil4' color={Colors.cyan} size={15}/>
            </View>
            <TextComponent text='Post a Job' style={styles.addText}/>
          </TouchableOpacity>
          <View style={styles.list}>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <TextComponent style={styles.jobTitle} text='Homeroom Teacher'/>
              <View style={styles.jobRight}>
                <TextComponent style={styles.matchCount} text='3 match'/>
                <IcoMoon name='chevron-right'/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </PageLayout>
    )
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default withNavigation(connect(mapStateToProps, null)(JobPosting));

const styles = StyleSheet.create({
  main: {
    paddingBottom: 20
  },
  add: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  addIcon: {
    backgroundColor: '#DCFEFD',
    width: 34,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  addText: {
    paddingLeft: 10,
    color: Colors.cyan,
    fontSize: 17
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey
  },
  jobTitle: {
    fontSize: 16,
    flex: 3
  },
  jobRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flex: 1
  },
  matchCount: {
    fontSize: 13
  }
});