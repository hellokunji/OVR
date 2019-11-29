/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';

const Chat = require('twilio-chat');
import _ from 'lodash';
import {
  getChatAccessTokenStart,
  getChatHistoryStart,
  updateChannelInfoStart
} from '../../store/actions/direct_message';

class InitChat extends React.Component {

  state = {
    updateChatClient: false
  };

  componentWillMount() {
    this.initChat(this.props.token).then(i => {});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token) this.initChat(nextProps.token).then(i => {});
  }

  initChat = async (token = this.props.token) => {
    if (token.data === null) {
      if (token.apiStatus !== 'started') this.props.getChatAccessTokenStart();
    } else {
      let createChatClient = false;
      if (!global.chatClient) {
        createChatClient = true;
      } else {
        createChatClient = this.state.updateChatClient;
      }

      if (createChatClient) {
        this.setState({updateChatClient: false});
        global.chatClient = await Chat.Client.create(token.data.token);
        this.subscribeToChatClientEvents();
      }
      this.props.getChatHistoryStart();
    }
  };

  subscribeToChatClientEvents() {
    global.chatClient.on('messageAdded', obj => {
      this.props.updateChannelInfoStart({
        uniqueName: _.clone(obj.channel.state.uniqueName),
        lastMessage: _.cloneDeep(obj.state),
        lastConsumedMessageIndex: _.clone(obj.channel.lastConsumedMessageIndex)
      });
      console.log('obj', obj);
    });

    global.chatClient.on('tokenAboutToExpire', () => {
      this.setState({updateChatClient: true}, () => {
        this.props.getChatAccessTokenStart();
      });
    });

    global.chatClient.on('tokenExpired', () => {
      this.setState({updateChatClient: true}, () => {
        this.props.getChatAccessTokenStart();
      });
    });

    global.chatClient.on('typingStarted', obj => {
      this.props.updateChannelInfoStart({
        uniqueName: _.clone(obj.channel.state.uniqueName),
        isTyping: _.clone(obj.state.isTyping),
      });
      console.log('obj', obj);
    });

    global.chatClient.on('typingEnded', obj => {
      this.props.updateChannelInfoStart({
        uniqueName: _.clone(obj.channel.state.uniqueName),
        isTyping: _.clone(obj.state.isTyping),
      });
      console.log('obj', obj);
    });
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    token: state.directMessage.token
  }
};

export default connect(mapStateToProps, {
  getChatAccessTokenStart,
  getChatHistoryStart,
  updateChannelInfoStart
})(InitChat);
