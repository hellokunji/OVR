/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {all} from 'redux-saga/effects';
import {
  watchSignIn,
  watchSignUp,
  watchFacebookSignIn,
  watchLinkedInSignIn,
  watchGetIpAddress,
  watchAddFCMToken, //NATIVE SPECIFIC CODE
  watchDeleteFCMToken, //NATIVE SPECIFIC CODE
  watchLogout,
} from './actions/auth';
import {watchSidebar} from './actions/layout';
import {
  watchGetUser,
  watchUpdateUser,
  watchCreateProfile,
  watchGetProfile,
  watchUpdateProfile
} from './actions/profile';
import {watchCreateJob, watchGetJob} from './actions/job';
import {
  watchUploadImage, 
  watchUploadImageMobile //NATIVE SPECIFIC CODE
} from './actions/upload';
import {watchGetCountries, watchGetCities, watchGetCurrencies} from './actions/misc';
import {watchGetExploreData, watchSetExploreData, watchSearchProfiles} from './actions/explore';
import {watchGetConnection} from './actions/connection';
import {
  watchGetChatAccessToken,
  watchGetUnreadMessage,
  watchSendPushNotification,
  watchGetChatHistory,
  watchUpdateChannelInfo,
} from './actions/direct_message';
import {watchGetProfileInfo} from './actions/profile_info';
//import {watchAddTest} from './actions/test';

export default function* rootSaga() {
  yield all([
    watchSidebar(),

    watchSignIn(),
    watchSignUp(),
    watchFacebookSignIn(),
    watchLinkedInSignIn(),
    watchGetIpAddress(),
    watchAddFCMToken(), //NATIVE SPECIFIC CODE
    watchDeleteFCMToken(), //NATIVE SPECIFIC CODE
    watchLogout(),

    watchGetUser(),
    watchUpdateUser(),
    watchCreateProfile(),
    watchGetProfile(),
    watchUpdateProfile(),

    watchCreateJob(),
    watchGetJob(),

    watchUploadImage(),
    watchUploadImageMobile(), //NATIVE SPECIFIC CODE

    watchGetCountries(),
    watchGetCities(),
    watchGetCurrencies(),

    watchGetExploreData(),
    watchSetExploreData(),
    watchSearchProfiles(),

    watchGetConnection(),

    watchGetChatAccessToken(),
    watchGetUnreadMessage(),
    watchGetChatHistory(),
    watchUpdateChannelInfo(),
    watchSendPushNotification(),

    watchGetProfileInfo()

    //watchAddTest()
  ])
}
