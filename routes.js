/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {createAppContainer, createDrawerNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import SideMenu from './modules/common/sidebar/sidebar';

import Homepage from './modules/homepage/homepage';
import SignIn from './modules/signin/signin';
import Signup from './modules/signup/signup';

import AuthMiddle from './modules/common/uncategorized/auth_middle';
import Explore from './modules/explore/explore';
import Onboarding from './modules/onboarding/onboarding';
import Settings from './modules/settings/settings';
import MyProfile from './modules/my_profile/my_profile';
import SmartSearch from './modules/smart_search/smart_search';
import NewMatches from './modules/dashboard/new_matches';
import Messages from './modules/dashboard/messages';
import Chat from './modules/dashboard/chat';
import Checklist from './modules/checklist/checklist';
import JobPosting from './modules/job_posting/job_posting';
import CreateJob from './modules/create_job/create_job';
import ScreeningQuestions from './modules/screening/screening';

import AuthLoadingScreen from './modules/common/uncategorized/auth_loading_screen';

const AuthStack = createStackNavigator(
  {
    Home: {
      screen: Homepage
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: Signup,
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const AppStack = createDrawerNavigator(
  {
    AuthMiddle: {
      screen: AuthMiddle
    },
    Onboarding: {
      screen: Onboarding,
    },
    Explore: {
      screen: Explore,
    },
    Settings: {
      screen: Settings,
    },
    MyProfile: {
      screen: MyProfile
    },
    SmartSearch: {
      screen: SmartSearch
    },
    NewMatches: {
      screen: NewMatches
    },
    Messages: {
      screen: Messages
    },
    Chat: {
      screen: Chat
    },
    Checklist: {
      screen: Checklist
    },
    JobPosting: {
      screen: JobPosting
    },
    CreateJob: {
      screen: CreateJob
    },
    ScreeningQuestions: {
      screen: ScreeningQuestions
    }
  },
  {
    initialRouteName: 'AuthMiddle',
    contentComponent: SideMenu,
    drawerWidth: 300
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));