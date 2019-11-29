/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ip from 'icepick';
import {createJobStart} from '../../store/actions/job';
import {requiredNumberValidation} from '../../utils/validation';
import {isDataValid} from '../../utils/helpers';
import {
  degrees,
  experienceData,
  salaryRange,
  studentAge,
  teachingQualification,
  jobPostingQuestions
} from '../../data/common';
import PageLayout from '../common/layout/page_layout';
import TextComponent from '../common/uncategorized/text';
import Button from '../common/button/button';
import TextInput from '../common/input/textinput';
import InlineDropDown from '../common/input/inline_dropdown';
import Currency from '../common/input/currency';
import City from '../common/input/city';
import Question from './question';
import LongProfileContent from '../explore/long_profile_content';
import GlobalStyle from '../../config/global_style';
import {Colors} from '../../config/theme';

class CreateJob extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,

      form: {
        step1: {
          job_title: '',
          location: '',
          salaryRange: '',
          currency: 'CNY'
        },
        step2: {
          studentAge: '',
          vacancies: '',
        },
        step3: {
          minimumEducation: '',
          minimumExperience: '',
          qualification: '',
        },
        step4: {
          why_work_here: 'We\'re seeking candidates of all experience levels to teach English or Subjects (Math, Science, Art) in public schools in Tianjin. Our compensation packages are competitive and include salary, housing, flight, insurance, paid holidays, and a legal work visa with Residence Permit. Enjoy the benefits of low living cost and an excellent work-life balance while teaching overseas. Our schools are well-equipped and teachers can feel secure working for a reputable employer who has their best interests in mind.',
          responsibilities: '*Manage and educate students in a classroom setting\n' +
          '*Develop and implement engaging lesson plans\n' +
          '*Ensure academic integrity - assign and grade homework, quizzes, and tests according to the standards of the school\n' +
          '*Participate fully in school activities and events',
          key_traits: '*Organizational and time-management skills\n' +
          '*Ability to build rapport easily with students and school faculty\n' +
          '*Excellent written and verbal communication skills\n' +
          '*Strong leadership qualities\n' +
          '*Ability to thrive in a cross-cultural organization'
        },
        step5: {
          bg_check: false,
          relocation: false,
          education: false,
          certification: false,
          citizenship: false,
          contract_length: false
        },
        step6: {}
      },
      err: {
        step1: {
          job_title: '',
          location: '',
          salaryRange: '',
          currency: ''
        },
        step2: {
          studentAge: '',
          vacancies: '',
        },
        step3: {
          minimumEducation: '',
          minimumExperience: '',
          qualification: '',
        },
        step4: {
          why_work_here: '',
          responsibilities: '',
          key_traits: ''
        },
        step5: {
          bg_check: '',
          relocation: '',
          education: '',
          certification: '',
          citizenship: '',
          contract_length: ''
        },
        step6: {}
      },

      submitClick: false
    };
  }

  componentWillMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', this.componentDidFocus),
      //this.props.navigation.addListener('willBlur', this.componentWillBlur),
    ];
  }

  componentDidFocus = () => {
    this.setState({
      activeStep: 1,

      form: {
        step1: {
          job_title: '',
          location: '',
          salaryRange: '',
          currency: 'CNY'
        },
        step2: {
          studentAge: '',
          vacancies: '',
        },
        step3: {
          minimumEducation: '',
          minimumExperience: '',
          qualification: '',
        },
        step4: {
          why_work_here: 'We\'re seeking candidates of all experience levels to teach English or Subjects (Math, Science, Art) in public schools in Tianjin. Our compensation packages are competitive and include salary, housing, flight, insurance, paid holidays, and a legal work visa with Residence Permit. Enjoy the benefits of low living cost and an excellent work-life balance while teaching overseas. Our schools are well-equipped and teachers can feel secure working for a reputable employer who has their best interests in mind.',
          responsibilities: '*Manage and educate students in a classroom setting\n' +
          '*Develop and implement engaging lesson plans\n' +
          '*Ensure academic integrity - assign and grade homework, quizzes, and tests according to the standards of the school\n' +
          '*Participate fully in school activities and events',
          key_traits: '*Organizational and time-management skills\n' +
          '*Ability to build rapport easily with students and school faculty\n' +
          '*Excellent written and verbal communication skills\n' +
          '*Strong leadership qualities\n' +
          '*Ability to thrive in a cross-cultural organization'
        },
        step5: {
          bg_check: false,
          relocation: false,
          education: false,
          certification: false,
          citizenship: false,
          contract_length: false
        },
        step6: {}
      },
      err: {
        step1: {
          job_title: '',
          location: '',
          salaryRange: '',
          currency: ''
        },
        step2: {
          studentAge: '',
          vacancies: '',
        },
        step3: {
          minimumEducation: '',
          minimumExperience: '',
          qualification: '',
        },
        step4: {
          why_work_here: '',
          responsibilities: '',
          key_traits: ''
        },
        step5: {
          bg_check: '',
          relocation: '',
          education: '',
          certification: '',
          citizenship: '',
          contract_length: ''
        },
        step6: {}
      },

      submitClick: false
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.createJob !== nextProps.createJob) {
      if (nextProps.createJob.apiStatus === 'success') this.props.navigation.navigate('Explore');
    }
  }

  handleBack = () => {
    const {activeStep} = this.state;
    if (activeStep === 1) {
      this.props.navigation.navigate('Explore');
    }
    else {
      this.setState({activeStep: activeStep - 1});
    }
  };

  handleNext = (e) => {
    const {activeStep} = this.state;
    if (activeStep === 6) {
      this.handleSubmit();
    }
    else {
      if (e) e.preventDefault();
      const step = `step${activeStep}`;
      this.validate('all', step);
      this.setState({submitClick: true}, () => {
        const err = this.state.err[step];
        if (Object.keys(err).every(key => err[key] === '')) {
          this.setState({activeStep: activeStep + 1, submitClick: false})
        }
      });
    }
  };

  handleInputChange = (name, value, step) => {
    //console.log('value', value);
    let {form} = this.state;
    form[step][name] = value;
    //console.log('form', form);
    this.setState({form}, () => {
      if (this.state.submitClick) this.validate(name, step);
      else return true;
    });
  };

  validate = (name = 'all', step) => {
    let {form, err} = this.state;

    switch (step) {
      case 'step1':
        if (name === 'all' || name === 'job_title') err[step].job_title = form[step].job_title !== '' ? '' : 'Required';
        if (name === 'all' || name === 'location') err[step].location = form[step].location !== '' ? '' : 'Required';
        if (name === 'all' || name === 'salaryRange') err[step].salaryRange = form[step].salaryRange !== '' ? '' : 'Required';
        if (name === 'all' || name === 'currency') err[step].currency = form[step].currency !== '' ? '' : 'Required';
        break;

      case 'step2':
        if (name === 'all' || name === 'studentAge') err[step].studentAge = form[step].studentAge !== '' ? '' : 'Required';
        if (name === 'all' || name === 'vacancies') err[step].vacancies = requiredNumberValidation(form[step].vacancies).errMsg;
        break;

      case 'step3':
        if (name === 'all' || name === 'minimumEducation') err[step].minimumEducation = form[step].minimumEducation !== '' ? '' : 'Required';
        if (name === 'all' || name === 'minimumExperience') err[step].minimumExperience = form[step].minimumExperience !== '' ? '' : 'Required';
        if (name === 'all' || name === 'qualification') err[step].qualification = form[step].qualification !== '' ? '' : 'Required';
        break;

      case 'step4':
        if (name === 'all' || name === 'job_details') err[step].job_details = form[step].job_details !== '' ? '' : 'Required';
        break;

      case 'step5':
        break;

      case 'step6':
        break;

      default:
    }

    //console.log('errrr', err);

    this.setState({err});
  };

  formatSubmitData = (use = 'submit') => {
    const {form} = this.state;
    let reqPayload = {job: {}};
    reqPayload.job.job_title = form.step1.job_title;
    reqPayload.job.location = form.step1.location;

    const salaryIndex = salaryRange.findIndex(item => item.name === form.step1.salaryRange);
    if (salaryIndex !== -1) {
      reqPayload.job.min_salary = salaryRange[salaryIndex].min;
      reqPayload.job.max_salary = salaryRange[salaryIndex].max;
    }
    reqPayload.job.currency = form.step1.currency;

    const studentAgeIndex = studentAge.findIndex(item => item.name === form.step2.studentAge);
    if (studentAgeIndex !== -1) {
      reqPayload.job.min_student_age = studentAge[studentAgeIndex].min;
      reqPayload.job.max_student_age = studentAge[studentAgeIndex].max;
    }
    reqPayload.job.number_of_vancies = form.step2.vacancies;

    reqPayload.job.education_experience_required = form.step3.minimumEducation;
    reqPayload.job.teaching_experience_required = form.step3.minimumExperience;
    reqPayload.job.detailed_qualifications = form.step3.qualification;

    reqPayload.job.why_work_here = form.step4.why_work_here;
    reqPayload.job.responsibilities = form.step4.responsibilities;
    reqPayload.job.key_traits = form.step4.key_traits;

    reqPayload.job.screening_preferences = {};
    reqPayload.job.screening_preferences.background_check = form.step5.bg_check;
    reqPayload.job.screening_preferences.relocation = form.step5.relocation;
    reqPayload.job.screening_preferences.education = form.step5.education;
    reqPayload.job.screening_preferences.certification = form.step5.certification;
    reqPayload.job.screening_preferences.citizenship = form.step5.citizenship;
    reqPayload.job.screening_preferences.contract_length = form.step5.contract_length;
    reqPayload.profile_type = 'JOB';
    reqPayload.is_completed = true;

    if (use === 'preview') {
      const {getProfile} = this.props;
      if (isDataValid(getProfile.data)) {
        if (isDataValid(getProfile.data.image_url)) {
          if (getProfile.data.image_url.length !== 0) {
            reqPayload.job.image_url = this.props.getProfile.data.image_url;
          }
        }
      }
    }

    return reqPayload;
  };

  handleSubmit = (e) => {
    if (e) e.preventDefault();
    this.validate();
    this.setState({submitClick: true}, () => {
      const {err} = this.state;
      if (Object.keys(err).every(key => (Object.keys(err[key]).every(keyItem => err[key][keyItem] === '')))) {
        this.props.createJobStart(this.formatSubmitData('submit'));
      }
    });
  };

  getStepDetails() {
    let obj = {
      title: '',
      progress: ''
    };

    const {activeStep} = this.state;
    switch (activeStep) {
      case 1:
        obj.title = 'Get Started';
        obj.progress = 5;
        break;

      case 2:
        obj.title = 'You’re almost there';
        obj.progress = 25;
        break;

      case 3:
        obj.title = 'Just a little more information';
        obj.progress = 50;
        break;

      case 4:
        obj.title = 'Just a little more information';
        obj.progress = 75;
        break;

      case 5:
        obj.title = 'Few questions to answer';
        obj.progress = 90;
        break;

      case 6:
        obj.title = 'Preview Job';
        obj.progress = 95;
        break;

      default:
        obj.title = 'Get Started';
        obj.progress = 5;

    }

    return obj;
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {

    const {form, err, activeStep} = this.state;
    const {createJob} = this.props;
    const stepObj = this.getStepDetails();

    return (
      <PageLayout
        title={'Post Your Job'}
        style='inline'
        customBack={true}
        backFunc={this.handleBack}
        progressBar={{
          show: true,
          value: stepObj.progress
        }}
      >
        <View style={styles.main}>
          <View style={styles.header}>
            <TextComponent
              text={stepObj.title}
              style={styles.headerText}
              fontWeight='Medium'
            />
            {activeStep === 5 && (
              <TextComponent
                text='Select questions that you want teachers to answer'
                style={styles.subText}
                fontWeight='Light'
              />
            )}
          </View>
          <View style={styles.inputs}>

            {activeStep === 1 && (
              <React.Fragment>
                <View style={styles.inputItem}>
                  <TextInput
                    label='Job Title'
                    placeholder='Enter the job title'
                    value={form.step1.job_title}
                    onChange={value => this.handleInputChange('job_title', value, 'step1')}
                    hasError={err.step1.job_title !== ''}
                    errorText={err.step1.job_title}
                  />
                </View>
                <View style={styles.inputItem}>
                  <City
                    label='Location'
                    placeholder='Select'
                    onChange={(value) => this.handleInputChange('location', value, 'step1')}
                    value={form.step1.location}
                    hasError={err.step1.location !== ''}
                    errText={err.step1.location}
                  />
                </View>
                <View style={[styles.inputItem, styles.salaryInput]}>
                  <TextComponent text='Salary Range per Month' style={GlobalStyle.inputLabel}/>
                  <View style={styles.salaryInputMain}>
                    <View style={[styles.salaryInputItem, styles.salaryItemRange]}>
                      <InlineDropDown
                        options={salaryRange}
                        onChange={(value) => this.handleInputChange('salaryRange', value, 'step1')}
                        value={form.step1.salaryRange}
                        hasError={err.step1.salaryRange !== ''}
                        errText={err.step1.salaryRange}
                      />
                    </View>
                    <View style={[styles.salaryInputItem, styles.salaryItemCurrency]}>
                      <Currency
                        placeholder='Select'
                        onChange={(value) => this.handleInputChange('currency', value, 'step1')}
                        value={form.step1.currency}
                        hasError={err.step1.currency !== ''}
                        errText={err.step1.currency}
                      />
                    </View>
                  </View>
                </View>
              </React.Fragment>
            )}

            {activeStep === 2 && (
              <React.Fragment>
                <View style={styles.inputItem}>
                  <TextComponent text='Age of students' style={GlobalStyle.inputLabel}/>
                  <InlineDropDown
                    options={studentAge}
                    onChange={(value) => this.handleInputChange('studentAge', value, 'step2')}
                    value={form.step2.studentAge}
                    hasError={err.step2.studentAge !== ''}
                    errText={err.step2.studentAge}
                  />
                </View>
                <View style={styles.inputItem}>
                  <TextInput
                    label='Number of vacancies'
                    placeholder='Enter the number of vacancies'
                    value={form.step2.vacancies}
                    onChange={value => this.handleInputChange('vacancies', value, 'step2')}
                    hasError={err.step2.vacancies !== ''}
                    errorText={err.step2.vacancies}
                  />
                </View>
              </React.Fragment>
            )}

            {activeStep === 3 && (
              <React.Fragment>
                <View style={styles.inputItem}>
                  <InlineDropDown
                    label='Minimum education required'
                    options={degrees}
                    onChange={(value) => this.handleInputChange('minimumEducation', value, 'step3')}
                    value={form.step3.minimumEducation}
                    hasError={err.step3.minimumEducation !== ''}
                    errText={err.step3.minimumEducation}
                  />
                </View>
                <View style={styles.inputItem}>
                  <InlineDropDown
                    label='Minimum experience required'
                    options={experienceData}
                    onChange={(value) => this.handleInputChange('minimumExperience', value, 'step3')}
                    value={form.step3.minimumExperience}
                    hasError={err.step3.minimumExperience !== ''}
                    errText={err.step3.minimumExperience}
                  />
                </View>
                <View style={styles.inputItem}>
                  <InlineDropDown
                    label='Teaching qualification'
                    options={teachingQualification}
                    onChange={(value) => this.handleInputChange('qualification', value, 'step3')}
                    value={form.step3.qualification}
                    hasError={err.step3.qualification !== ''}
                    errText={err.step3.qualification}
                  />
                </View>
              </React.Fragment>
            )}

            {activeStep === 4 && (
              <React.Fragment>
                <View style={styles.inputItem}>
                  <TextInput
                    label='Why work here?'
                    value={form.step4.why_work_here}
                    multiline={true}
                    height={150}
                    onChange={value => this.handleInputChange('why_work_here', value, 'step4')}
                    placeholder='Write something here...'
                    hasError={err.step4.why_work_here !== ''}
                    errorText={err.step4.why_work_here}
                  />
                </View>
                <View style={styles.inputItem}>
                  <TextInput
                    label='Responsibilities'
                    value={form.step4.responsibilities}
                    multiline={true}
                    height={150}
                    onChange={value => this.handleInputChange('responsibilities', value, 'step4')}
                    placeholder='Write something here...'
                    hasError={err.step4.responsibilities !== ''}
                    errorText={err.step4.responsibilities}
                  />
                </View>
                <View style={styles.inputItem}>
                  <TextInput
                    label='Key Traits'
                    value={form.step4.key_traits}
                    multiline={true}
                    height={150}
                    onChange={value => this.handleInputChange('key_traits', value, 'step4')}
                    placeholder='Write something here...'
                    hasError={err.step4.key_traits !== ''}
                    errorText={err.step4.key_traits}
                  />
                </View>
              </React.Fragment>
            )}

            {activeStep === 5 && (
              <React.Fragment>
                {jobPostingQuestions.map((item, index) => {
                  return (
                    <View style={[styles.inputItem, styles.inputQuestionItem]}>
                      <Question
                        title={item.title}
                        description={item.description}
                        value={form.step5[item.key]}
                        onChange={value => this.handleInputChange(item.key, value, 'step5')}
                      />
                    </View>
                  )
                })}
              </React.Fragment>
            )}

            {activeStep === 6 && (
              <React.Fragment>
                <View style={styles.preview}>
                  <LongProfileContent
                    profile={this.formatSubmitData('preview').job}
                    usageRole={'teacher'}
                  />
                </View>
              </React.Fragment>
            )}
          </View>
          <View style={styles.action}>
            <Button
              onClick={this.handleNext}
              label='Continue'
              type='default'
              size='xl'
              showLoading={createJob.apiStatus === 'started'}
              isDisabled={createJob.apiStatus === 'started'}
            />
          </View>
        </View>
      </PageLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    createJob: state.job.createJob,
    getProfile: state.profile.getProfile
  }
};

export default connect(mapStateToProps, {createJobStart})(CreateJob);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20
  },

  header: {
    marginTop: 20
  },
  headerText: {
    fontSize: 22
  },
  subText: {
    fontSize: 14,
    color: Colors.midGrey,
    marginTop: 3
  },

  inputs: {
    marginTop: 10
  },
  inputItem: {
    marginVertical: 10
  },
  salaryInput: {},
  salaryInputMain: {
    flexDirection: 'row'
  },
  salaryInputItem: {},
  salaryItemRange: {
    flex: 3,
    paddingRight: 5
  },
  salaryItemCurrency: {
    flex: 1,
    paddingLeft: 5
  },
  inputQuestionItem: {
    paddingVertical: 10,
    marginVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey
  },
  preview: {
    borderWidth: 1,
    borderColor: Colors.lightGrey
  },

  action: {
    marginTop: 20
  }
});