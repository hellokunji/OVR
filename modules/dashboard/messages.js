/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import _ from 'lodash';
import {getChatAccessTokenStart} from '../../store/actions/direct_message';
import Layout from './layout';
import InboxItem from './inbox_item';
import InlineLoader from '../common/loader/inline_loader';
import InitChat from './init_chat';

const Messages = props => {
  const {history} = props;
  return (
    <Layout pageFor='messages'>
      {history.data !== null && _.isArray(history.data) ? (
        <FlatList
          data={history.data}
          keyExtractor={(item, index) => item.uniqueName}
          initialNumToRender={history.data.length}
          renderItem={({item, index}) => {
            return (
              <InboxItem channel={item}/>
            )
          }}
        />
      ) : <InlineLoader/>}
      {history.apiStatus !== 'started' && history.apiStatus !== 'success' && <InitChat/>}
    </Layout>
  )
};

const mapStateToProps = state => {
  let accountType = null;
  const {getUser} = state.profile;
  if (getUser.data !== null) accountType = getUser.data.usage_role.toLowerCase();
  return {
    accountType,
    token: state.directMessage.token,
    history: state.directMessage.history,
    userId: state.auth.userId
  }
};

export default connect(mapStateToProps, {getChatAccessTokenStart})(Messages);

const {width} = Dimensions.get('screen');
const horizontalPadding = 20;
const actionWidth = 90;
