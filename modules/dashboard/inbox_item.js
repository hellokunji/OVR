import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import _ from 'lodash';
import {isDataValid, getFirstLine, getSecondLine, getProfileImg} from '../../utils/helpers';
import {getPeerId} from '../../utils/direct_message';
import {updateChannelInfoStart} from '../../store/actions/direct_message';
import {Colors, FontFamily} from '../../config/theme';
import TextComponent from '../common/uncategorized/text';

class InboxItem extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getChannelInstance().then(i => {
    });
  }

  getChannelInstance = async () => {
    global.chatClient.getChannelByUniqueName(this.props.channel.uniqueName)
      .then(channel => {
        if (channel.state.status === 'invited') {
          channel.join().then(() => {
            this.fetchInfo(channel);
          });
        } else {
          this.fetchInfo(channel);
        }
      })
      .catch(err => {
      })
  };

  fetchInfo = channel => {
    this.setMessage(channel);
    this.setMembers(channel);
  };

  setMessage = (channel) => {
    channel.getMessages(1).then(messages => {
      let lastMessage = null;
      if (messages.items.length !== 0) {
        lastMessage = _.cloneDeep(messages.items[0].state);
        //alert(JSON.stringify(lastMessage));
        this.props.updateChannelInfoStart({
          uniqueName: this.props.channel.uniqueName,
          lastMessage
        });
      }
    });
  };

  setMembers = (channel) => {
    channel.getMembers()
      .then(members => {
        let memberList = [];
        let iter = 0, length = members.length;
        for (iter; iter < length; iter++) {
          memberList.push(_.cloneDeep(members[iter].state));
        }
        this.props.updateChannelInfoStart({
          uniqueName: this.props.channel.uniqueName,
          members: memberList
        });
      })
      .catch(err => {

      })
  };

  formatMessageBody = () => {
    const {lastMessage} = this.props.channel;
    const {userId} = this.props;
    let message = '';
    if (isDataValid(lastMessage)) {
      const msg = lastMessage.body;
      if (isDataValid(msg)) {
        if (msg.indexOf('OVERxxFLOzzFILE') !== -1) {
          const msgArr = msg.split(':::');
          if (msgArr.length >= 3) {
            const format = msgArr[1].split('=')[1];
            if (format === 'png' || format === 'jpg' || format === 'jpeg' || format === 'gif') {
              message = lastMessage.author === userId ? 'You sent an image' : 'You received an image';
            } else if (format === 'pdf') {
              message = lastMessage.author === userId ? 'You sent an pdf' : 'You received an pdf';
            }
          }
        } else {
          message = lastMessage.author === userId ? `You: ${lastMessage.body}` : lastMessage.body;
        }
      }
    } else {
      message = 'Say hi to new connection'
    }
    return message;
  };

  filterProfileDetails = () => {
    const {profiles, accountType, channel, userId} = this.props;

    let userDetail = {
      'image': '',
      'title': '',
      'subtitle': '',
      id: null,
    };
    const uniqueName = channel.uniqueName;
    const peerId = getPeerId(uniqueName, userId, accountType);
    if (isDataValid(peerId) && isDataValid(accountType)) {
      if (isDataValid(profiles[peerId])) {
        userDetail.image = getProfileImg(profiles[peerId].image_url, null, accountType);
        userDetail.title = getFirstLine(profiles[peerId], accountType);
        userDetail.subtitle = getSecondLine(profiles[peerId], accountType);
        userDetail.id = peerId;
      }
    }
    return userDetail;
  };

  checkIfNew = () => {
    let isNew = false;
    const {channel, userId} = this.props;
    if (isDataValid(channel.lastMessage)) {
      if (channel.lastMessage.author !== userId) {
        isNew = channel.lastConsumedMessageIndex !== channel.lastMessage.index;
      }
    }
    return isNew;
  };

  checkIfRead = () => {
    let isRead = false;
    const {channel} = this.props;
    if (isDataValid(channel.members)) {
      if (channel.members.length > 1) {
        const peerIndex = channel.members.findIndex(item => item.identity !== this.props.userId);
        if (peerIndex !== -1) {
          isRead = channel.members[peerIndex].lastConsumedMessageIndex === channel.lastConsumedMessageIndex;
        }
      }
    }
    return isRead;
  };

  render() {
    const {channel} = this.props;

    const userDetail = this.filterProfileDetails();
    const isNew = this.checkIfNew();
    const isRead = this.checkIfRead();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this.props.navigation.navigate('Chat', {peerId: userDetail.id, uniqueName: channel.uniqueName})}>
        <View style={styles.info}>
          <Image style={styles.profilePic}
                 source={userDetail.image}/>
          <View style={styles.details}>
            <Text style={[styles.title, isNew && styles.titleBold]}
                  numberOfLines={1}
                  ellipsizeMode='tail'>
              {userDetail.title}
            </Text>
            {channel.isTyping ? (
              <TextComponent text='typing...' style={[styles.subtitle, styles.typing]}/>
            ) : (
              <Text style={[styles.subtitle, isNew && styles.subtitleBold]}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                {this.formatMessageBody()}
              </Text>
            )}
            <Text style={styles.subtitle}
                  numberOfLines={1}
                  ellipsizeMode='tail'>
              {userDetail.subtitle}
            </Text>
          </View>
        </View>
        {isRead && (
          <View style={styles.status}>
            <Image source={userDetail.image} style={styles.statusImg}/>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  let accountType = null;
  const {getUser} = state.profile;
  if (getUser.data !== null) accountType = getUser.data.usage_role.toLowerCase();
  return {
    accountType,
    userId: state.auth.userId,
    profiles: state.profileInfo.profiles.data
  }
};

export default withNavigation(connect(mapStateToProps, {updateChannelInfoStart})(InboxItem));

const {width} = Dimensions.get('screen');
const horizontalPadding = 20;
const actionWidth = 90;
const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalPadding
  },
  info: {
    width: width - horizontalPadding * 2 - actionWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7
  },
  profilePic: {
    width: 51,
    height: 51,
    borderRadius: 26
  },
  details: {
    paddingLeft: 10,
    flex: 1
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.primaryFont
  },
  titleBold: {
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 12,
    fontFamily: FontFamily.primaryFont
  },
  typing: {
    color: Colors.cyan
  },
  subtitleBold: {
    fontWeight: '600'
  },
  status: {
    width: actionWidth,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 15
  },
  statusImg: {
    width: 15,
    height: 15,
    borderRadius: 8,
    alignSelf: 'flex-end'
  }
});
