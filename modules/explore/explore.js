/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Animated,
  PanResponder,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {exploreDataLimit} from '../../data/common';
import {getRandomNum, isDataValid, getFirstLine, getSecondLine, getThirdLine} from '../../utils/helpers';
import {isScreeningComplete, isNoJobs} from '../../utils/validation';
import {getUnsafePadding} from '../../utils/native_app';
import {getExploreDataStart, setExploreDataStart, searchProfilesStart, resetExplore} from '../../store/actions/explore';
import {getUserStart} from '../../store/actions/profile';
import {getJobStart} from '../../store/actions/job';
import {sidebarViewStart} from '../../store/actions/layout';
import Header from './header';
import ActionBar from './action_bar';
import LongProfile from './long_profile';
import TextComponent from '../common/uncategorized/text';
import GlobalStyle from '../../config/global_style';
import InlineLoader from '../common/loader/inline_loader';
import NoResult from './no_result';
import CommonPopup from '../common/popup/cmn_popup';
import SwitchJobPopup from './switch_job_popup';
import InitChat from '../dashboard/init_chat';
import {Colors} from '../../config/theme';
import IcoMoon from '../common/uncategorized/icon';

const {height, width} = Dimensions.get('window');
const placeholderImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1aijqW-3W-mdVFARqWIjG-Z9_bSsWW7nk1zlcY7ptAyezR5weTQ';

class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      longProfile: {
        show: false,
        data: null
      },
      showScreening: !isScreeningComplete(props.preference),

      showNoJobs: isNoJobs(props.getJob.data),
      showSwitchJobPopup: false,
      defaultJob: null,
      random: getRandomNum()
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
        ...this.position.getTranslateTransform()
      ]
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [0, 0, 0.6],
      extrapolate: 'clamp'
    });

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });

    this.superLikeOpacity = this.position.y.interpolate({
      inputRange: [-height / 2, 0, height / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
  }

  componentWillMount() {
    this.setDefaultJob();
    //this.fetchData();
    this.subs = [
      this.props.navigation.addListener('didFocus', this.componentDidFocus),
      this.props.navigation.addListener('willBlur', this.componentWillBlur),
    ];

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        let posX = 0;
        let posY = 0;

        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          posX = gestureState.dx;
          posY = 0;
        }
        else {
          posX = 0;
          posY = gestureState.dy < 0 ? gestureState.dy : 0;
        }

        this.position.setValue({x: posX, y: posY})
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) === 0 && Math.abs(gestureState.dy) === 0) {
          this.toggleLongProfile();
        }
        else {
          if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
            if (gestureState.dx > 120) {
              this.likeProfile();
            }
            else if (gestureState.dx < -120) {
              this.viewProfile();
            }
            else {
              this.resetProfile();
            }
          }
          else {
            //console.log('gestureState.dy', gestureState.dy);
            if (gestureState.dy < -200) {
              this.superLikeProfile();
            }
            else {
              this.resetProfile();
            }
          }
        }
      }
    })
  }

  componentDidFocus = () => {
    this.setDefaultJob();
    this.fetchData();
    const {usageRole} = this.props;
    if (usageRole === 'teacher') {
      this.setState({
        showScreening: !isScreeningComplete(this.props.preference)
      });
    }
    this.setNoJobs();
  };

  componentWillBlur = () => {
    this.props.resetExplore();
  };

  componentWillReceiveProps(nextProps) {
    /*if (this.props.getJob !== nextProps.getJob) {
      if (nextProps.getJob.apiStatus === 'success') {
        this.setDefaultJob(nextProps.getJob);
        this.setNoJobs(nextProps.getJob)
      }
    }*/
  }

  likeProfile = () => {
    Animated.spring(this.position, {
      toValue: {x: width + 100, y: 0}
    }).start(() => {
      //this.setState({currentIndex: this.state.currentIndex + 1}, () => {
      this.removeLastCard('LIKE');
      this.position.setValue({x: 0, y: 0})
      //})
    })
  };

  viewProfile = () => {
    Animated.spring(this.position, {
      toValue: {x: -width - 100, y: 0}
    }).start(() => {
      //this.setState({currentIndex: this.state.currentIndex + 1}, () => {
      this.removeLastCard('VIEW');
      this.position.setValue({x: 0, y: 0})
      //})
    })
  };

  superLikeProfile = () => {
    Animated.spring(this.position, {
      toValue: {y: -height - 100, x: 0}
    }).start(() => {
      //this.setState({currentIndex: this.state.currentIndex + 1}, () => {
      this.removeLastCard('SUPERLIKE');
      this.position.setValue({x: 0, y: 0})
      //})
    })
  };

  resetProfile = () => {
    Animated.spring(this.position, {
      toValue: {x: 0, y: 0},
      friction: 3
    }).start()
  };

  profileAction = action => {
    if (action === 'VIEW') {
      this.viewProfile();
    }
    else if (action === 'LIKE') {
      this.likeProfile();
    }
    else if (action === 'SUPERLIKE') {
      this.superLikeProfile();
    }
    else {
      this.resetProfile();
    }
  };

  longProfileAction = action => {
    let longProfile = this.state.longProfile;
    longProfile.show = false;
    longProfile.data = null;

    this.setState({longProfile}, () => {
      this.profileAction(action);
    })
  };

  getFirstCardId = () => {
    const cards = this.filterExploreData();
    if (cards.length > 0) {
      return cards[0].id;
    }
    else {
      return null;
    }
  };

  removeLastCard = action => {
    const userId = this.getFirstCardId();
    if (userId !== null) {
      let visitorId;
      if (this.props.usageRole.toLowerCase() === 'teacher') {
        visitorId = this.props.userId;
      }
      else {
        visitorId = this.state.defaultJob.id;
      }
      this.props.setExploreDataStart({userId, action, visitorId});
      this.setState({random: getRandomNum()});
      let cards = this.filterExploreData();
      const {getExploreData} = this.props;
      if (!getExploreData.isFinished) {
        if (cards.length === 1) this.fetchData();
        //this.setState({dynamicSwipeLeft: false, dynamicSwipeRight: false});
      }
    }
  };

  toggleLongProfile = () => {
    let longProfile = this.state.longProfile;
    if (this.state.longProfile.show) {
      longProfile.show = false;
      longProfile.data = null;
    }
    else {
      longProfile.show = true;
      const cards = this.filterExploreData();
      longProfile.data = cards[0];
    }
    this.setState({longProfile})
  };

  fetchData = () => {
    const {getExploreData, searchProfiles, usageRole, userId} = this.props;

    if (getExploreData.apiStatus !== 'started') {
      if (searchProfiles.filter === null) {
        let reqPayload = {offset: getExploreData.offset, limit: exploreDataLimit};
        if (usageRole === 'teacher') {
          reqPayload.profileId = userId;
          this.props.getExploreDataStart(reqPayload);
        }
        else {
          const defaultJob = this.state.defaultJob;
          if (isDataValid(defaultJob)) {
            reqPayload.profileId = defaultJob.id;
            this.props.getExploreDataStart(reqPayload);
          }
        }
      }
      else {
        this.props.searchProfilesStart({
          offset: getExploreData.offset,
          limit: exploreDataLimit,
          filter: searchProfiles.filter
        })
      }
    }
  };

  renderShortInfo = (profile) => {
    const {usageRole} = this.props;
    return (
      <View style={styles.shortInfo}>
        {getFirstLine(profile, usageRole) !== '' && (
          <TextComponent
            style={styles.shortInfoTitle}
            text={getFirstLine(profile, usageRole)}
            fontWeight={'Medium'}
          />
        )}
        {getSecondLine(profile, usageRole) !== '' && (
          <TextComponent
            style={styles.shortInfoDetail}
            text={getSecondLine(profile, usageRole)}
          />
        )}
        {getThirdLine(profile, usageRole) !== '' && (
          <TextComponent
            style={usageRole === 'teacher' ? styles.shortInfoSalary : styles.shortInfoDetail}
            text={getThirdLine(profile, usageRole)}
            fontWeight={'Medium'}
          />
        )}
      </View>
    )
  };

  renderUsers = () => {
    const cards = this.filterExploreData();
    const {currentIndex} = this.state;
    return cards.map((item, index) => {
      const images = isDataValid(item.image_url) ? item.image_url : [];
      //const currentImg = placeholderImg;
      const currentImg = images[0] !== undefined ? images[0] : placeholderImg;
      //console.log(`${index} - ${currentImg}`);

      if (index < currentIndex) {
        return null
      }
      else if (index === currentIndex) {
        //console.log('item.user_id', item.user_id);
        return (
          <Animated.View
            userId={item.user_id}
            {...this.PanResponder.panHandlers}
            key={`card-${item.user_id}-${index}`}
            style={[this.rotateAndTranslate, styles.card]}
          >
            <ImageBackground
              style={styles.imageWrapper}
              source={{uri: currentImg}}
            >
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)']} style={styles.overlay}>
                {this.renderShortInfo(item)}
              </LinearGradient>
            </ImageBackground>

            <Animated.View style={[{opacity: this.likeOpacity}, styles.actionOverlay, styles.likeOverlay]}>
              {/*<IcoMoon name='check' size={50}/>*/}
            </Animated.View>

            <Animated.View style={[{opacity: this.dislikeOpacity}, styles.actionOverlay, styles.dislikeOverlay]}>
              {/*<IcoMoon name='cross' size={50}/>*/}
            </Animated.View>

            <Animated.View style={[{opacity: this.superLikeOpacity}, styles.actionOverlay, styles.superLikeOverlay]}>
              {/*<IcoMoon name='check' size={50}/>*/}
            </Animated.View>
          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View
            key={`card-${item.user_id}-${index}`}
            style={[{opacity: this.nextCardOpacity, transform: [{scale: this.nextCardScale}]}, styles.card]}
          >
            {index < currentIndex + 3 && (
              <ImageBackground
                style={styles.imageWrapper}
                source={{uri: currentImg}}
              >
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']} style={styles.overlay}>
                  {this.renderShortInfo(item)}
                </LinearGradient>
              </ImageBackground>
            )}
          </Animated.View>
        )
      }
    }).reverse()
  };

  filterExploreData = () => {
    const {getExploreData} = this.props;
    let exploreData = getExploreData.apiStatus === 'success' ? getExploreData.data : [];
    let result = [];
    let iter = 0;
    const length = exploreData.length;
    for (iter; iter < length; iter++) {
      const item = exploreData[iter];
      //console.log('comp-viewed', item.viewed);
      if (!item.viewed) result.push(item)
    }
    return result;
  };

  toggleScreeningQuestions = () => {
    this.setState({showScreening: !this.state.showScreening})
  };

  toggleNoJobs = () => {
    this.setState({showNoJobs: !this.state.showNoJobs})
  };

  setNoJobs = (getJob = this.props.getJob) => {
    const {usageRole} = this.props;
    if (usageRole === 'school') {
      this.setState({
        showNoJobs: isNoJobs(getJob.data)
      })
    }
  };

  toggleSwitchJobPopup = () => {
    this.setState({showSwitchJobPopup: !this.state.showSwitchJobPopup});
  };

  setDefaultJob = async (getJob = this.props.getJob) => {
    if (isDataValid(getJob.data)) {
      let defaultJobIndex = 0;
      const defaultJobId = await AsyncStorage.getItem('schoolDefaultJobId');
      if (defaultJobId) defaultJobIndex = getJob.data.findIndex(item => item.id === defaultJobId);
      if (defaultJobIndex !== -1) {
        const defaultJob = getJob.data[defaultJobIndex];
        this.setState({defaultJob}, () => {this.fetchData()});
      }
    }
  };

  renderSwitchJobs = () => {
    let component = null;
    const {defaultJob} = this.state;
    if (isDataValid(defaultJob)) {
      return (
        <View style={styles.switchJobBar}>
          <TextComponent style={styles.switchLabel} text='Show candidate for' fontWeight={'Thin'}/>
          <View style={styles.switchContent}>
            <TouchableOpacity style={styles.switchBtn} onPress={this.toggleSwitchJobPopup}>
              <TextComponent style={styles.switchBtnLabel} text={defaultJob.job_title}/>
              <IcoMoon name='chevron-down' color={Colors.cyan}/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return component;
  };

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  render() {
    const {usageRole, searchProfiles, getExploreData} = this.props;
    const {longProfile, showScreening, showNoJobs, showSwitchJobPopup} = this.state;
    const cards = this.filterExploreData();
    return (
      <SafeAreaView style={GlobalStyle.droidSafeArea}>
        <View style={styles.main}>
          <View style={styles.header}>
            <Header/>
          </View>
          {usageRole === 'school' && this.renderSwitchJobs()}
          <View style={styles.deck}>
            {cards.length > 0
              ? this.renderUsers()
              : (getExploreData.isFinished ? <NoResult usageRole={usageRole}/> : <InlineLoader/>)
            }
          </View>
          <View style={styles.action}>
            <ActionBar
              pressUndo={() => this.profileAction('UNDO')}
              pressView={() => this.profileAction('VIEW')}
              pressSuperLike={() => this.profileAction('SUPERLIKE')}
              pressLike={() => this.profileAction('LIKE')}
              pressBoost={() => this.profileAction('BOOST')}
            />
          </View>

          {searchProfiles.filter !== null && (
            <View style={styles.filterToast}>
              <TextComponent style={styles.filterLabel} text='Filters'/>
              <View style={styles.filterCountBox}>
                <TextComponent style={styles.filterCount} text={searchProfiles.filter.length}/>
              </View>
            </View>
          )}

        </View>
        {longProfile.show && (
          <LongProfile
            visible={longProfile.show}
            profile={longProfile.data}
            usageRole={usageRole}
            pressUndo={() => this.longProfileAction('UNDO')}
            pressView={() => this.longProfileAction('VIEW')}
            pressSuperLike={() => this.longProfileAction('SUPERLIKE')}
            pressLike={() => this.longProfileAction('LIKE')}
            pressBoost={() => this.longProfileAction('BOOST')}
          />
        )}

        {usageRole === 'teacher' && (
          <CommonPopup
            visible={showScreening}
            title='Complete your screening questions'
            description='We need you to complete your profile to swipe on jobs and see your matches.'
            leftBtn={{
              show: false
            }}
            rightBtn={{
              show: true,
              label: "Let's do this",
              onClick: () => {
                this.toggleScreeningQuestions();
                this.props.navigation.navigate('ScreeningQuestions')
              }
            }}
          />
        )}

        {usageRole === 'school' && (
          <CommonPopup
            visible={showNoJobs}
            title='Create a Job'
            description='We need you to create at least one job to swipe on teachers and see your matches.'
            leftBtn={{
              show: false
            }}
            rightBtn={{
              show: true,
              label: "Let's do this",
              onClick: () => {
                this.toggleNoJobs();
                this.props.navigation.navigate('CreateJob')
              }
            }}
          />
        )}

        {(usageRole === 'school' && showSwitchJobPopup) && (
          <SwitchJobPopup
            onHide={this.toggleSwitchJobPopup}
            onSelect={() => {
              this.toggleSwitchJobPopup();
              this.setDefaultJob();
            }}
          />
        )}

        <InitChat/>
        
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    getExploreData: state.explore.getExploreData,
    usageRole: state.profile.getUser.data.usage_role.toLowerCase(),
    searchProfiles: state.explore.searchProfiles,
    preference: state.profile.getProfile.data.preference,
    getJob: state.job.getJob,
    userId: state.auth.userId
  }
};

export default connect(mapStateToProps, {
  sidebarViewStart,
  getExploreDataStart,
  setExploreDataStart,
  getUserStart,
  searchProfilesStart,
  getJobStart,
  resetExplore
})(Explore);

const headerHeight = 60;
const actionHeight = 60;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative'
  },

  header: {
    paddingHorizontal: 20,
    height: headerHeight
  },

  switchJobBar: {
    position: 'absolute',
    top: headerHeight,
    zIndex: 2,
    backgroundColor: Colors.white,
    width: '100%',
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 7
  },
  switchLabel: {
    flex: 2
  },
  switchContent: {
    flex: 3,
    alignItems: 'flex-end'
  },
  switchBtn: {
    flexDirection: 'row'
  },
  switchBtnLabel: {
    color: Colors.cyan,
    paddingRight: 5
  },

  deck: {
    height: height - headerHeight - actionHeight - getUnsafePadding(),
    overflow: 'hidden'
  },
  card: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  actionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
    justifyContent: 'center'
  },
  likeOverlay: {
    backgroundColor: Colors.green
  },
  dislikeOverlay: {
    backgroundColor: Colors.red
  },
  superLikeOverlay: {
    backgroundColor: Colors.cyan
  },
  imageWrapper: {
    flex: 1,
    resizeMode: 'cover'
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  shortInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  shortInfoTitle: {
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 3,
    color: Colors.white
  },
  shortInfoDetail: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 2,
    color: Colors.white
  },
  shortInfoSalary: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 3,
    color: Colors.white
  },

  action: {
    //paddingTop: 10,
    paddingHorizontal: 0,
    height: actionHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  actionItem: {
    width: '19%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionItemMiddle: {
    width: '22%',
    alignItems: 'center'
  },
  actionMiddleImg: {
    width: 40,
    height: 40
  },

  filterToast: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    top: 80,
    width: 100,
    borderRadius: 25,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 5,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 3,
    shadowColor: Colors.midGrey
  },
  filterLabel: {
    fontSize: 14,
    color: Colors.midGrey
  },
  filterCountBox: {
    backgroundColor: Colors.red,
    minWidth: 22,
    minHeight: 20,
    borderRadius: 10,
    paddingVertical: 2,
    marginLeft: 7
  },
  filterCount: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.white
  }
});