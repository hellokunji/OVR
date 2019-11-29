import _ from 'lodash';
import {isDataValid} from './helpers';

export function chatHistory() {
  return global.chatClient.getSubscribedChannels()
    .then((channels) => {
      let response = [];
      let iter = 0, length = channels.items.length;
      for (iter; iter < length; iter++) {
        const channel = channels.items[iter];
        if (isDataValid(channel.state.uniqueName)) response.push(_.cloneDeep(channel.state));
      }
      return {response};
    })
    .catch((error) => {
      if (error) {
        return {error};
      }
    });
}

export function getChannelMessage(uniqueName) {
  return global.chatClient.getChannelByUniqueName(uniqueName)
    .then(channel => {
      channel.getMessages(1)
        .then(messages => {
          let lastMessage = null;
          if (messages.items.length !== 0) {
            lastMessage = _.cloneDeep(messages.items[0]);
            return {lastMessage, lastConsumedMessageIndex: _.cloneDeep(channel.state.lastConsumedMessageIndex)};
          }
        })
        .catch(err => {
          return {error: err}
        });

      channel.getMembers()
        .then(members => {

        })
        .catch(err => {

        })
    })
    .catch(err => {
      return {error: err}
    })
}

export function getPeerId(uniqueName, userId, accountType) {
  let peerId = null;
  if (isDataValid(uniqueName)) {
    const idArr = uniqueName.split('+');
    if (accountType === 'school') {
      peerId = idArr[0].includes('-') ? idArr[1] : idArr[0];
    } else {
      peerId = userId === idArr[0] ? idArr[1] : idArr[0];
    }
  }
  return peerId;
}
