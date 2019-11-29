/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import {combineReducers} from 'redux';
import layoutReducer from './reducers/layout';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import jobReducer from './reducers/job';
import formReducer from './reducers/form';
import uploadReducer from './reducers/upload';
import miscReducer from './reducers/misc';
import exploreReducer from './reducers/explore';
import connectionReducer from './reducers/connection';
import directMessageReducer from './reducers/direct_message';
import profileInfoReducer from './reducers/profile_info';
//import testReducer from './reducers/test';

const reducer = combineReducers({
  layout: layoutReducer,
  auth: authReducer,
  profile: profileReducer,
  job: jobReducer,
  form: formReducer,
  upload: uploadReducer,
  misc: miscReducer,
  explore: exploreReducer,
  connection: connectionReducer,
  directMessage: directMessageReducer,
  profileInfo: profileInfoReducer,
  //test: testReducer
});

export default reducer;