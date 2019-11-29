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
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import TextComponent from '../common/uncategorized/text';
import {getFirstLine, getSecondLine, getThirdLine, isDataValid} from '../../utils/helpers';
import {studentAge} from '../../data/common';
import {Colors} from '../../config/theme';

const placeholderImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1aijqW-3W-mdVFARqWIjG-Z9_bSsWW7nk1zlcY7ptAyezR5weTQ';

class LongProfileContent extends React.Component {

  constructor(props) {
    super(props);
    const {profile} = this.props;
    const images = isDataValid(profile.image_url) ? profile.image_url : [];
    if (images.length === 0) images[0] = placeholderImg;
    this.state = {
      images
    }
  }

  renderImagePagination = (index, total, context) => {
    let items = [];
    for (let iter = 0; iter < total; iter++) {
      items.push(
        <View style={styles.pageItem}>
          <View style={[styles.pageItemBox, index === iter && styles.pageItemBoxActive]}/>
        </View>
      );
    }
    return <View style={styles.pagination}>{items}</View>;
  };

  render() {
    const {images} = this.state;
    const {profile, usageRole} = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.imageBox}>
          <Swiper style={styles.wrapper} showsButtons={false} autoPlay={false}
                  renderPagination={this.renderImagePagination}>
            {images.map((item, index) => {
              if (isDataValid(item)) {
                return (
                  <View style={styles.imageItem}>
                    <Image style={styles.image} source={{uri: item}}/>
                  </View>
                )
              }
            })}
          </Swiper>
        </View>
        <View style={styles.content}>
          <View style={styles.infoGroup}>
            <TextComponent style={styles.title} text={getFirstLine(profile, usageRole)} fontWeight={'Medium'}/>
            <TextComponent style={styles.detail} text={getSecondLine(profile, usageRole)}/>
            <TextComponent style={usageRole === 'teacher' ? styles.detail : styles.title}
                           text={getThirdLine(profile, usageRole)}/>
          </View>
          {usageRole === 'school' && (
            <React.Fragment>
              <View style={styles.infoGroup}>
                {isDataValid(profile.teaching_qualification) && (
                  <TextComponent style={styles.detail} text={`Qualification: ${profile.teaching_qualification}`}/>
                )}
              </View>
              <View style={styles.infoGroup}>
                {isDataValid(profile.bio) && (
                  <TextComponent style={styles.detail} text={`Qualification: ${profile.bio}`}/>
                )}
              </View>
            </React.Fragment>
          )}
          {usageRole === 'teacher' && (
            <React.Fragment>
              <View style={styles.infoGroup}>
                {isDataValid(profile.number_of_vancies) && (
                  <TextComponent style={styles.detail}
                                 text={`Vacancies: ${profile.number_of_vancies}`}/>
                )}
                {isDataValid(profile.detailed_qualifications) && (
                  <TextComponent style={styles.detail}
                                 text={`Teaching qualification: ${profile.detailed_qualifications}`}/>
                )}
                {isDataValid(profile.teaching_experience_required) && (
                  <TextComponent style={styles.detail}
                                 text={`Teaching experience required: ${profile.teaching_experience_required}`}/>
                )}
                {isDataValid(profile.education_experience_required) && (
                  <TextComponent style={styles.detail}
                                 text={`Education required: ${profile.education_experience_required}`}/>
                )}
                {(isDataValid(profile.min_student_age) && isDataValid(profile.max_student_age)) && (
                  <TextComponent
                    style={styles.detail}
                    text={`Student age: ${
                      studentAge[studentAge.findIndex(item => (item.min === profile.min_student_age && item.max === profile.max_student_age))].name
                    }`}
                  />
                )}
              </View>
              {isDataValid(profile.why_work_here) && (
                <View style={styles.infoGroup}>
                  <TextComponent style={styles.detail} text='Why Work Here'/>
                  <TextComponent style={styles.detail} text={profile.why_work_here}/>
                </View>
              )}
              {isDataValid(profile.responsibilities) && (
                <View style={styles.infoGroup}>
                  <TextComponent style={styles.detail} text='Responsibilities'/>
                  <TextComponent style={styles.detail} text={profile.responsibilities}/>
                </View>
              )}
              {isDataValid(profile.key_traits) && (
                <View style={styles.infoGroup}>
                  <TextComponent style={styles.detail} text='Key Traits'/>
                  <TextComponent style={styles.detail} text={profile.key_traits}/>
                </View>
              )}
            </React.Fragment>
          )}
        </View>
      </View>
    )
  }
}

LongProfileContent.propTypes = {
  profile: PropTypes.object.isRequired,
  usageRole: PropTypes.string.isRequired
};

LongProfileContent.defaultProps = {};

export default LongProfileContent;

const styles = StyleSheet.create({
  main: {
    flex: 1
  },

  imageBox: {
    width: '100%',
    height: 400
  },
  imageItem: {
    flex: 1
  },
  image: {
    flex: 1
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 10,
    top: 10
  },
  pageItem: {
    height: 5,
    paddingHorizontal: 3,
    flex: 1
  },
  pageItemBox: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    flex: 1
  },
  pageItemBoxActive: {
    backgroundColor: 'rgba(255,255,255,1)'
  },

  content: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    paddingBottom: 100
  },
  infoGroup: {
    paddingVertical: 7
  },
  infoGroup1: {
    paddingVertical: 7
  },
  infoGroup2: {
    paddingVertical: 7
  },
  infoGroup3: {
    paddingVertical: 7
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 3
  },
  detail: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 2,
    color: Colors.midGrey
  },
});