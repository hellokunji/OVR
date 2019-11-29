/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {
  degrees,
  experienceData,
  currentExperienceData,
  schoolType,
  exploreDataLimit,
  jobPostingQuestions
} from '../../data/common';
import {calculateYearFromNow} from '../../utils/helpers';
import {isScreeningComplete} from '../../utils/validation';
import {searchProfilesStart} from '../../store/actions/explore';
import PageLayout from '../common/layout/page_layout';
import Checkbox from '../common/input/checkbox';
import TextComponent from '../common/uncategorized/text';
import InlineDropDown from '../common/input/inline_dropdown';
import Country from '../common/input/country';
import Currency from '../common/input/currency';
//import City from '../common/input/city';
import RadioInput from '../common/input/radioinput';
import Button from '../common/button/button';
import RangeSlider from '../common/input/range_slider';
import styles from './smart_search_styles';

const {width} = Dimensions.get('screen');

class SmartSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        nationality: [], //For School
        minAgeValue: 10, //For School
        maxAgeValue: 80, //For School
        currency: 'CNY', //For School
        experience: null, //For School
        currentExperience: null, //For School
        highestDegree: null, // For School
        gender: '', // For School
        backgroundCheck: false, //For School
        preference: {
          bg_check: false,
          relocation: false,
          education: false,
          certification: false,
          contract_length: false
        }, // For School
        city: [], //For Teacher
        minSalaryValue: 5000, //For Teacher
        maxSalaryValue: 100000, //For Teacher,
        schoolType: [], // For Teacher
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchProfiles !== nextProps.searchProfiles) {
      if (nextProps.searchProfiles.apiStatus === 'success') this.props.navigation.navigate('Explore');
    }
  }

  handleInputChange = (name, value) => {
    //console.log(value);
    let {form} = this.state;
    if (name === 'schoolType') {
      if (value !== '') form.schoolType.push({name: value, isChecked: true});
    }
    else if (name === 'salary') {
      form.minSalaryValue = value.minValue;
      form.maxSalaryValue = value.maxValue;
    }
    else if (name === 'age') {
      form.minAgeValue = value.minValue;
      form.maxAgeValue = value.maxValue;
    }
    else if (name === 'city') {
      form.city.push({name: value, isChecked: true});
    }
    else if (name === 'nationality') {
      form.nationality.push({name: value, isChecked: true});
    }
    else if (name === 'currency') {
      form.curency = value.split(' - ')[0];
    }
    else {
      form[name] = value;
    }
    this.setState({form})
  };

  /*handleChangeCity = index => {
    let {form} = this.state;
    form.city[index].isChecked = !form.city[index].isChecked;
    this.setState({form});
  };

  handleChangeSchoolType = index => {
    let {form} = this.state;
    form.schoolType[index].isChecked = !form.schoolType[index].isChecked;
    this.setState({form});
  };*/

  handleChangeCountry = index => {
    let {form} = this.state;
    form.nationality[index].isChecked = !form.nationality[index].isChecked;
    this.setState({form});
  };

  onChangePreference = key => {
    let {form} = this.state;
    form.preference[key] = !form.preference[key];
    this.setState({form});
  };

  filterExcludeCity = () => {
    let excludeOptions = [];
    const city = this.state.form.city;
    for (let iter = 0; iter < city.length; iter++) {
      excludeOptions.push({name: city[iter].name})
    }
    return excludeOptions;
  };

  filterExcludeCountry = () => {
    let excludeOptions = [];
    const nationality = this.state.form.nationality;
    for (let iter = 0; iter < nationality.length; iter++) {
      excludeOptions.push({name: nationality[iter].name})
    }
    return excludeOptions;
  };

  handleSubmit = () => {
    const {accountType, getProfile} = this.props;
    const {form} = this.state;
    let reqPayload = {
      offset: 0,
      limit: exploreDataLimit,
      filter: []
    };
    if (accountType === 'school') {
      reqPayload.filter.push({term: {profile_type: 'teacher'}});
      if (form.highestDegree !== null) reqPayload.filter.push({match: {highest_awarded_degree: form.highestDegree.toLowerCase()}});
      reqPayload.filter.push({
        range: {
          dob: {
            lte: calculateYearFromNow(form.minAgeValue),
            gte: calculateYearFromNow(form.maxAgeValue)
          }
        }
      });
      if (form.experience !== null) {
        const expIndex = experienceData.findIndex(item => item.name === form.experience);
        if (expIndex !== -1) {
          const expItem = experienceData[expIndex];
          reqPayload.filter.push({range: {min_experience: {gte: expItem.min}}});
          if (expItem.max !== null) reqPayload.filter.push({range: {max_experience: {lte: expItem.max}}});
        }
      }
      if (form.currentExperience !== null) {
        const expIndex = currentExperienceData.findIndex(item => item.name === form.currentExperience);
        if (expIndex !== -1) {
          const expItem = currentExperienceData[expIndex];
          reqPayload.filter.push({range: {current_position_min_experience: {gte: expItem.min}}});
          if (expItem.max !== null) reqPayload.filter.push({range: {current_position_max_experience: {lte: expItem.max}}});
        }
      }
      if (form.nationality.length > 0) {
        let nationality = [];
        for (let nationalityIter = 0; nationalityIter < form.nationality.length; nationalityIter++) {
          const item = form.nationality[nationalityIter];
          if (item.isChecked) nationality.push(item.name.toLowerCase());
        }
        reqPayload.filter.push({terms: {nationality}});
      }

      if (form.gender !== '') reqPayload.filter.push({term: {gender: form.gender.toLowerCase()}});

      if (form.preference.bg_check) reqPayload.filter.push({term: {'preference.background_check': true}});
      if (form.preference.relocation) reqPayload.filter.push({term: {'preference.relocation': true}});
      if (form.preference.education) reqPayload.filter.push({term: {'preference.education': true}});
      if (form.preference.certification) reqPayload.filter.push({term: {'preference.certification': true}});
      if (form.preference.contract_length) reqPayload.filter.push({term: {'preference.contract_length': true}});
    }
    else {
      reqPayload.filter.push({term: {profile_type: 'job'}});
      reqPayload.filter.push({range: {min_salary: {gte: form.minSalaryValue}}});
      reqPayload.filter.push({range: {max_salary: {lte: form.maxSalaryValue}}});
      if (form.schoolType.length > 0) {
        let schoolType = [];
        for (let schoolIter = 0; schoolIter < form.schoolType.length; schoolIter++) {
          const schoolName = form.schoolType[schoolIter].name.toLowerCase();
          const arr1 = schoolName.split('/');
          if (arr1[0]) {
            const arr2 = arr1[0].split('-');
            schoolType.push(arr2[0]);
            if (arr2[1]) schoolType.push(arr2[1]);
          }
          if (arr1[1]) {
            const arr2 = arr1[1].split('-');
            schoolType.push(arr2[0]);
            if (arr2[1]) schoolType.push(arr2[1]);
          }
        }
        reqPayload.filter.push({terms: {school_type: schoolType}});
      }
      if (form.city.length > 0) {
        let city = [];
        for (let cityIter = 0; cityIter < form.city.length; cityIter++) {
          city.push(form.city[cityIter].name.toLowerCase());
        }
        reqPayload.filter.push({terms: {school_location: city}});
      }
      if (getProfile.data !== null) {
        const preference = getProfile.data.preference;
        if (isScreeningComplete(preference)) {
          Object.keys(preference).forEach((key, index) => {
            if (preference[key] === false) {
              const keyName = `screening_preferences.${key}`;
              let term = {};
              term[keyName] = preference[key];
              reqPayload.filter.push({term});
            }
          });
        }
      }
    }
    this.props.searchProfilesStart(reqPayload);
  };

  render() {

    const {form} = this.state;
    const {accountType, searchProfiles} = this.props;

    return (
      <PageLayout title={'Search'} backTo='Explore' style='inline'>
        <View style={styles.main}>

          {/*<View style={styles.section}>
            <TextComponent style={styles.sectionHead} text='Perfect Matches' fontWeight={'Medium'}/>
            <View style={styles.sectionBody}>
              <View style={[styles.inputItem, styles.inputItemCheckbox]}>
                <View style={styles.checkboxLabel}>
                  <TextComponent style={styles.checkboxLabelText} text='Only show Perfect Matches?'/>
                </View>
                <View style={styles.checkboxAction}>
                  <Checkbox
                    isChecked={false}
                    onChange={() => {
                    }}
                  />
                </View>
              </View>
            </View>
          </View>*/}

          {accountType === 'teacher' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Salary' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={[styles.inputItem]}>
                  <View style={styles.rangeDropDown}>
                    <Currency
                      placeholder='Select currency'
                      onChange={value => this.handleInputChange('currency', value)}
                      value={form.currency}
                    />
                  </View>
                  <TextComponent style={styles.rangeValueText}
                                 text={`${form.minSalaryValue} - ${form.maxSalaryValue}`}/>
                  <View style={styles.range}>
                    <RangeSlider
                      minRange={5000}
                      maxRange={100000}
                      sliderLength={width - 40}
                      onChange={values => this.handleInputChange('salary', values)}
                      minValue={form.minSalaryValue}
                      maxValue={form.maxSalaryValue}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {/*accountType === 'teacher' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='School Type' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={[styles.inputItem]}>
                  <View style={styles.optionList}>
                    {form.schoolType.map((item, index) => {
                      return (
                        <View key={`school-${item.name}`} style={[styles.inputItem, styles.inputItemCheckbox]}>
                          <View style={styles.checkboxLabel}>
                            <TextComponent style={styles.checkboxLabelText} text={item.name}/>
                          </View>
                          <View style={styles.checkboxAction}>
                            <Checkbox
                              isChecked={item.isChecked}
                              onChange={() => this.handleChangeSchoolType(index)}
                            />
                          </View>
                        </View>
                      )
                    })}
                  </View>
                  <View style={styles.inputItem}>
                    <InlineDropDown
                      options={schoolType}
                      onChange={(value) => this.handleInputChange('schoolType', value)}
                    />
                  </View>
                </View>
              </View>
            </View>
          )*/}

          {/*accountType === 'teacher' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Location' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={styles.optionList}>
                  {form.city.map((item, index) => {
                    return (
                      <View key={`city-${item.name}`} style={[styles.inputItem, styles.inputItemCheckbox]}>
                        <View style={styles.checkboxLabel}>
                          <TextComponent style={styles.checkboxLabelText} text={item.name}/>
                        </View>
                        <View style={styles.checkboxAction}>
                          <Checkbox
                            isChecked={item.isChecked}
                            onChange={() => this.handleChangeCity(index)}
                          />
                        </View>
                      </View>
                    )
                  })}
                </View>
                <View style={styles.inputItem}>
                  <City
                    placeholder='Select city'
                    onChange={value => this.handleInputChange('city', value)}
                    excludeOptions={this.filterExcludeCity()}
                  />
                </View>
              </View>
            </View>
          )*/}

          {accountType === 'school' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Age' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={[styles.inputItem]}>
                  <TextComponent style={styles.rangeValueText}
                                 text={`${form.minAgeValue} - ${form.maxAgeValue}`}/>
                  <View style={styles.range}>
                    <RangeSlider
                      minRange={10}
                      maxRange={80}
                      sliderLength={width - 40}
                      onChange={values => this.handleInputChange('age', values)}
                      minValue={form.minAgeValue}
                      maxValue={form.maxAgeValue}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {accountType === 'school' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Gender' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={[styles.inputItem]}>
                  <RadioInput
                    value={form.gender}
                    options={[
                      {key: 'male', label: 'Male', value: 'MALE'},
                      {key: 'female', label: 'Female', value: 'FEMALE'},
                      {key: 'other', label: 'Other', value: 'OTHER'}
                    ]}
                    onChange={(value) => this.handleInputChange('gender', value)}
                  />
                </View>
              </View>
            </View>
          )}

          {accountType === 'school' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Nationality' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={styles.optionList}>
                  {form.nationality.map((item, index) => {
                    return (
                      <View key={`nationality-${item.name}`} style={[styles.inputItem, styles.inputItemCheckbox]}>
                        <View style={styles.checkboxLabel}>
                          <TextComponent style={styles.checkboxLabelText} text={item.name}/>
                        </View>
                        <View style={styles.checkboxAction}>
                          <Checkbox
                            isChecked={item.isChecked}
                            onChange={() => this.handleChangeCountry(index)}
                          />
                        </View>
                      </View>
                    )
                  })}
                  <View style={styles.inputItem}>
                    <Country
                      placeholder='Select country'
                      onChange={value => this.handleInputChange('nationality', value)}
                      excludeOptions={this.filterExcludeCountry()}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {accountType === 'school' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Highest Awarded Degree' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={styles.inputItem}>
                  <InlineDropDown
                    options={degrees}
                    onChange={(value) => this.handleInputChange('highestDegree', value)}
                    value={form.highestDegree !== null ? form.highestDegree : ''}
                  />
                </View>
              </View>
            </View>
          )}

          {accountType === 'school' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Experience' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={styles.inputItem}>
                  <InlineDropDown
                    options={experienceData}
                    onChange={(value) => this.handleInputChange('experience', value)}
                    value={form.experience !== null ? form.experience : ''}
                  />
                </View>
              </View>
            </View>
          )}

          {accountType === 'school' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Years in Current Position' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                <View style={styles.inputItem}>
                  <InlineDropDown
                    options={experienceData}
                    onChange={(value) => this.handleInputChange('currentExperience', value)}
                    value={form.currentExperience !== null ? form.currentExperience : ''}
                  />
                </View>
              </View>
            </View>
          )}

          {accountType === 'school' && (
            <View style={styles.section}>
              <TextComponent style={styles.sectionHead} text='Verifications' fontWeight={'Medium'}/>
              <View style={styles.sectionBody}>
                {jobPostingQuestions.map((item, index) => {
                  return (
                    <View style={[styles.inputItem, styles.inputItemCheckbox]}>
                      <View style={styles.checkboxLabel}>
                        <TextComponent style={styles.checkboxLabelText} text={item.title}/>
                      </View>
                      <View style={styles.checkboxAction}>
                        <Checkbox
                          isChecked={form.preference[item.key]}
                          onChange={() => this.onChangePreference(item.key)}
                        />
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Button
              onClick={this.handleSubmit}
              label='Show Results'
              type='default'
              size='xl'
              showLoading={searchProfiles.apiStatus === 'started'}
              isDisabled={searchProfiles.apiStatus === 'started'}
            />
          </View>
        </View>
      </PageLayout>
    )
  }
}

const mapStateToProps = state => {
  let accountType = null;
  const {getUser} = state.profile;
  if (getUser.data !== null) accountType = getUser.data.usage_role.toLowerCase();
  return {
    accountType,
    searchProfiles: state.explore.searchProfiles,
    getProfile: state.profile.getProfile
  }
};

export default connect(mapStateToProps, {searchProfilesStart})(SmartSearch);