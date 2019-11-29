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
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Chat = require('twilio-chat');
//import RNFetchBlob from 'react-native-fetch-blob';
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-crop-picker';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import {
  getChatAccessTokenStart,
  getUnreadMessageStart,
  updateChannelInfoStart,
  sendPushNotificationStart,
} from '../../store/actions/direct_message';
import {uploadImageMobileStart} from '../../store/actions/upload';
import {getFirstLine, getSecondLine, getProfileImg, getRandomNum, isDataValid} from '../../utils/helpers';
import {getUnsafePadding} from '../../utils/native_app';
import TextComponent from '../common/uncategorized/text';
import ChatEmpty from './chat_empty';
import IcoMoon from '../common/uncategorized/icon';
import Messages from './messages';
import InlineLoader from '../common/loader/inline_loader';
import GlobalStyle from '../../config/global_style';
import CommonWebView from '../common/webview/common_webview'
import {Colors} from '../../config/theme';

class ChatScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: {
        loaded: false,
        items: [],
        randomNumber: getRandomNum()
      },
      isTyping: false,
      newMessage: '',

      upload: false,
      fileType: null,
      msgNotificationSent: false,

      fileViewer: {
        show: false,
        uri: null
      }
    }
  }

  componentWillMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', this.componentDidFocus),
      this.props.navigation.addListener('willBlur', this.componentWillBlur),
    ];
    this.initChat(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token) this.initChat(nextProps.token);
    if (this.props.uploadImage !== nextProps.uploadImage) {
      if (nextProps.uploadImage.apiStatus === 'success' && this.props.uploadImage.apiStatus !== 'success') {
        const {upload, fileType} = this.state;
        if (upload) {
          const data = nextProps.uploadImage.data;
          let format = null;
          if (fileType === 'image/jpg' || fileType === 'image/png' || fileType === 'image/jpeg'
            || fileType === 'image/gif' || fileType === 'jpg' || fileType === 'png'
            || fileType === 'jpeg' || fileType === 'gif') {
            format = 'jpg';
          } else if (fileType === 'application/pdf' || fileType === 'pdf') {
            format = 'pdf';
          }
          this.sendMessage(`OVERxxFLOzzFILE:::Format=${format}:::Src=${data.url}`);
        }
      }
    }
  }

  componentDidFocus = () => {
    this.initChat(this.props.token);
  };

  componentWillBlur = () => {
    this.setState({
      messages: {
        loaded: false,
        items: [],
        randomNumber: getRandomNum()
      },
      isTyping: false,
      newMessage: '',

      mediaUpload: false
    });
    global.channel = undefined;
  };

  initChat = async (token = this.props.token) => {
    if (token.data === null) {
      if (token.apiStatus !== 'started') this.props.getChatAccessTokenStart();
    } else {
      if (!global.chatClient) {
        global.chatClient = await Chat.Client.create(token.data.token);
        this.start();
      } else {
        this.start();
      }
    }
  };

  start = () => {
    const {navigation} = this.props;
    const peerId = navigation.getParam('peerId', null);
    const uniqueName = navigation.getParam('uniqueName', null);
    const friendlyName = 'Overflo Chat Channel';
    if (isDataValid(uniqueName) && uniqueName !== 'undefined' &&
      isDataValid(peerId.toString()) && peerId.toString() !== 'undefined') {
      global.chatClient.getChannelByUniqueName(uniqueName).then(channel => {
        //console.log('channelexists', channel);
        global.channel = channel;
        if (global.channel.state.status === 'invited') {
          global.channel.join().then(() => {
            this.initMessages();
          });
        } else {
          this.initMessages();
        }
      }).catch((err) => {
        //console.log('channelnotexists', err);
        global.chatClient.createChannel({uniqueName: uniqueName, friendlyName})
          .then(channel => {
            global.channel = channel;
            this.joinTheChannel(true);
          });
      });
    }
  };

  joinTheChannel = (invite = false) => {
    global.channel.join().then(() => {
      //console.log('channel joined');
      if (invite) this.checkChannelMembers();
      this.initMessages();
    })
  };

  checkChannelMembers = () => {
    global.channel.getMembers().then(members => {
      //console.log('members', members);
      if (members.length !== 2) this.inviteMemberToChannel();
    });
  };

  inviteMemberToChannel = () => {
    const {navigation} = this.props;
    const peerId = navigation.getParam('peerId', null);
    global.channel.invite(peerId).then(function () {
      //console.log(peerId + 'has been invited');
    });
  };

  initMessages = () => {
    //console.log('initMessages');
    global.channel.getMessages(100).then(messagePage => {
      this.messagesLoaded(messagePage);
    });
    global.channel.on('messageAdded', this.messageAdded);
    global.channel.on('typingStarted', () => this.toggleTyping(true));
    global.channel.on('typingEnded', () => this.toggleTyping(false));
  };

  toggleTyping = (bool = !this.state.isTyping) => {
    this.setState({isTyping: bool});
  };

  messagesLoaded = msgs => {
    //console.log('messagesLoaded', msgs);
    let {messages} = this.state;
    let items = [];
    let iter = 0, length = msgs.items.length;
    for (iter; iter < length; iter++) {
      items.push(msgs.items[iter].state);
    }
    messages.items = items;
    messages.loaded = true;
    this.setState({messages}, function () {
      this.updateConsumptionHorizon();
    });
  };

  updateConsumptionHorizon = async () => {
    await global.channel.setAllMessagesConsumed();
    this.props.updateChannelInfoStart({
      uniqueName: global.channel.uniqueName,
      lastConsumedMessageIndex: global.channel.state.lastConsumedMessageIndex
    });
    //const channels = await global.chatClient.getSubscribedChannels();
    //this.props.getUnreadMessageStart(channels);
  };

  messageAdded = message => {
    //console.log('messageadded', message.state);
    let {messages} = this.state;
    if (message.state.author !== this.props.userId) {
      if (messages.items.findIndex(item => item.index === message.state.index) === -1) {
        messages.items.push(message.state);
        messages.randomNumber = getRandomNum();
      }
      this.setState({messages}, function () {
        this.updateConsumptionHorizon();
      });
    }
  };

  onChangeMsg = value => {
    this.setState({newMessage: value});
    global.channel.typing();
  };

  sendMessage = async (newMessage = this.state.newMessage) => {
    const {messages} = this.state;
    if (messages.loaded) {
      if (newMessage !== '') {
        let messages = this.state.messages;
        messages.items.push({
          author: this.props.userId,
          body: newMessage,
          sid: getRandomNum(),
        });
        messages.randomNumber = getRandomNum();
        this.setState({messages, newMessage: ''}, () => {
          this.checkAndSendMsgNotification();
        });
        await global.channel.sendMessage(newMessage);
      } else {
        //const node = this.msgInput.current;
        //node.focus();
      }
    } else {
      //const node = this.msgInput.current;
      //node.focus();
    }
  };

  checkAndSendMsgNotification = () => {
    console.log('level1');
    if (!this.state.msgNotificationSent) {
      console.log('level2');
      window.channel.getUserDescriptors().then(paginator => {
        console.log('level3');
        console.log('paginator.state.items', paginator.state.items);
        if (paginator.state.items.length > 1) {
          console.log('level4');
          console.log('userId', this.props.userId);
          const peerIndex = paginator.state.items.findIndex(item => item.identity !== this.props.userId);
          if (peerIndex !== -1) {
            console.log('level5', peerIndex);
            //const peer = peerIndex === 0 ? paginator.state.items[1] : paginator.state.items[1];
            const peer = paginator.state.items[peerIndex];
            console.log('peer', peer);
            if (peer.online === null || !peer.online) {
              console.log('sendmessage');
              this.setState({msgNotificationSent: true}, () => {
                this.props.sendPushNotificationStart({receiver_id: peer.identity});
              });
            }
          }
        }
      });
    }
    //chatClient.on('userUpdated', this.handleUserUpdate(user));
  };

  /*downloadFile = src => {
    console.log('src', src);
    RNFetchBlob
      .config({
        // add this option that makes response data to be stored as a file,
        // this is much more performant.
        fileCache: true,
        addAndroidDownloads: {
          // Show notification when response data transmitted
          notification: true,
          // Title of download notification
          title: 'Download success ',
          // File description (not notification description)
          description: 'An image file.',
          mime: 'image/png',
          // Make the file scannable  by media scanner
          mediaScannable: true,
        }
      })
      .fetch('GET', src, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res.path())
      })

  };*/

  getMsgBody = (msg, isMe) => {
    let msgBody = null;
    if (msg.indexOf('OVERxxFLOzzFILE') !== -1) {
      const msgArr = msg.split(':::');
      if (msgArr.length >= 3) {
        const format = msgArr[1].split('=')[1];
        const src = msgArr[2].split('=')[1];
        if (format === 'png' || format === 'jpg' || format === 'jpeg' || format === 'gif') {
          if (isMe) {
            msgBody = (
              <View style={[styles.textBoxC, styles.textBoxMyMsgImgC]}>
                <TouchableOpacity onPress={() => this.setState({fileViewer: {show: true, uri: src}})}>
                  <Image style={styles.imageMsg} source={{uri: src}}/>
                </TouchableOpacity>
              </View>
            )
          } else {
            msgBody = (
              <View style={[styles.textBoxC, styles.textBoxPeerMsgImgC]}>
                <TouchableOpacity onPress={() => this.setState({fileViewer: {show: true, uri: src}})}>
                  <Image style={styles.imageMsg}
                       source={{uri: src}}/>
                </TouchableOpacity>
              </View>
            )
          }
        } else if (format === 'pdf') {
          if (isMe) {
            msgBody = (
              <TouchableOpacity
                style={[styles.textBoxC, styles.textBoxFile, styles.textBoxMyMsgFileC]}
                onPress={() => this.setState({fileViewer: {show: true, uri: src}})}
              >
                <IcoMoon name='file-check'/>
                <TextComponent style={styles.fileDownloadText} text='View pdf'/>
              </TouchableOpacity>
            )
          } else {
            msgBody = (
              <TouchableOpacity
                style={[styles.textBoxC, styles.textBoxFile, styles.textBoxPeerMsgFileC]}
                onPress={() => this.setState({fileViewer: {show: true, uri: src}})}
              >
                <IcoMoon name='file-check'/>
                <TextComponent style={styles.fileDownloadText} text='View pdf'/>
              </TouchableOpacity>
            )
          }
        }
      }
    } else {
      if (isMe) {
        msgBody = (
          <View style={[styles.textBoxC, styles.textBoxMyMsgC]}>
            <TextComponent style={[styles.textC, styles.textMyMsgC]} text={msg}/>
          </View>
        )
      } else {
        msgBody = (
          <View style={[styles.textBoxC, styles.textBoxPeerMsgC]}>
            <TextComponent style={[styles.textC, styles.textPeerMsgC]} text={msg}/>
          </View>
        )
      }
    }
    return msgBody;
  };

  handleAddFile = index => {
    if (index === 0) {
      this.openPicker();
    } else if (index === 1) {
      this.openDocument();
    }
  };

  openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      showCropFrame: true,
      mediaType: 'image',
      includeBase64: true
    }).then(image => {
      this.setState({upload: true, fileType: image.mime}, () => {
        this.uploadFile(image);
      });
    });
  };

  openDocument = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      if (res) {
        console.log('resss', res);
        let reqPayload = {
          filename: decodeURI(res.fileName),
          path: decodeURI(res.uri.replace('file://', '')),
          mime: 'application/pdf'
        };
        //if (folderName) reqPayload.folderName = folderName;
        this.setState({upload: true, fileType: 'application/pdf'}, () => {
          this.uploadFile(reqPayload);
        });
      }
    });
  };

  uploadFile = image => {
    console.log('image', image);
    this.props.uploadImageMobileStart(image);
  };

  filterProfileDetails = () => {
    const {profiles, accountType, userId} = this.props;

    let userDetail = {
      'image': '',
      'title': '',
      'subtitle': ''
    };
    if (isDataValid(window.channel)) {
      const uniqueName = window.channel.state.uniqueName;
      if (isDataValid(uniqueName)) {
        const idArr = uniqueName.split('+');
        let peerId = null;
        if (accountType === 'school') {
          peerId = idArr[0].includes('-') ? idArr[1] : idArr[0];
        } else {
          peerId = userId === idArr[0] ? idArr[1] : idArr[0];
        }
        if (isDataValid(peerId) && isDataValid(accountType)) {
          if (isDataValid(profiles[peerId])) {
            userDetail.image = getProfileImg(profiles[peerId].image_url, null, accountType);
            userDetail.title = getFirstLine(profiles[peerId], accountType);
            userDetail.subtitle = getSecondLine(profiles[peerId], accountType);
          }
        }
      }
    }

    return userDetail;
  };

  render() {

    const {messages, newMessage, isTyping, fileViewer} = this.state;
    const {userId, uploadImage} = this.props;

    const userDetail = this.filterProfileDetails();

    return (
      <SafeAreaView style={[GlobalStyle.droidSafeArea, styles.main]}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <View style={styles.left}>
              <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Messages')}>
                <IcoMoon name='arrow-left' size={18}/>
              </TouchableOpacity>
              <View style={styles.profileImg}>
                <Image style={styles.image} source={userDetail.image}/>
              </View>
              <View style={styles.details}>
                <TextComponent text={userDetail.title} style={styles.title} fontWeight='Medium'/>
                {isTyping ? (
                  <TextComponent text='Typing...' style={[styles.subtitle, styles.typing]}/>
                ) : (
                  <TextComponent text={userDetail.subtitle} style={styles.subtitle}/>
                )}
              </View>
            </View>
          </View>
          <View style={styles.body}>
            {messages.loaded ? (
              messages.items.length === 0 ? <ChatEmpty userDetail={userDetail}/> : (
                <View style={styles.mainC}>
                  <FlatList
                    style={styles.flatListC}
                    ref={ref => this.flatList = ref}
                    keyExtractor={(item, index) => item.sid}
                    onContentSizeChange={() => {
                      this.flatList.scrollToEnd({animated: true});
                    }}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                    data={messages.items}
                    renderItem={({item}) => {
                      let component = null;
                      let msgBody = this.getMsgBody(item.body, item.author === userId);
                      if (item.author === userId) {
                        component = (
                          <View style={[styles.itemC, styles.itemMyMsgC]}>
                            {msgBody}
                          </View>
                        )
                      } else {
                        component = (
                          <View style={[styles.itemC, styles.itemPeerMsgC]}>
                            <Image source={userDetail.image}/>
                            {msgBody}
                          </View>
                        )
                      }
                      return component;
                    }}
                  />
                </View>
              )
            ) : <InlineLoader/>}
          </View>
          <View style={styles.input}>
            <View style={styles.inputFile}>
              {uploadImage.apiStatus === 'started' ? (
                <ActivityIndicator color={Colors.midGrey} size={'small'}/>
              ) : (
                <TouchableOpacity style={styles.inputFileIcon} onPress={() => this.ActionSheet.show()}>
                  <IcoMoon name='plus' size={15}/>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                blurOnSubmit={false}
                style={styles.textInput}
                onChangeText={this.onChangeMsg}
                value={newMessage}
                editable={uploadImage.apiStatus !== 'started'}
              />
            </View>
            <View style={styles.sendBtn}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => {
                  if (uploadImage.apiStatus !== 'started') this.sendMessage()
                }}>
                <TextComponent style={styles.submitBtnText} text='Submit'/>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Select File Type'}
          options={['Photo Library', 'Document', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index) => this.handleAddFile(index)}
        />
        {fileViewer.show && (
          <CommonWebView
            uri={fileViewer.uri}
            onClose={() => this.setState({fileViewer: {show: false, uri: null}})}
          />
        )}
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  let accountType = null;
  const {getUser} = state.profile;
  if (getUser.data !== null) accountType = getUser.data.usage_role.toLowerCase();
  return {
    accountType,
    token: state.directMessage.token,
    userId: state.auth.userId,
    uploadImage: state.upload.uploadImage,
    profiles: state.profileInfo.profiles.data,
  }
};

export default connect(mapStateToProps, {
  getChatAccessTokenStart,
  getUnreadMessageStart,
  uploadImageMobileStart,
  updateChannelInfoStart,
  sendPushNotificationStart,
})(ChatScreen);

const headerHeight = 60;
const footerHeight = 60;
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    paddingTop: 10,
    height
  },

  header: {
    height: headerHeight,
    flexDirection: 'row',
    paddingHorizontal: 17,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: Colors.midGrey,
    backgroundColor: Colors.white
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    paddingRight: 10
  },
  profileImg: {},
  image: {
    width: 37,
    height: 37,
    borderRadius: 19
  },
  details: {
    paddingLeft: 10
  },
  title: {
    fontSize: 14
  },
  subtitle: {
    fontSize: 12
  },
  typing: {
    color: Colors.cyan
  },

  body: {
    height: height - headerHeight - footerHeight - getUnsafePadding() - (Platform.OS === 'android' ? 30 : 0)
  },

  mainC: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    paddingVertical: 10,
  },
  flatListC: {
    height: '100%'
  },
  itemC: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 17
  },
  textBoxC: {
    width: 'auto',
    padding: 10,
    borderRadius: 7
  },
  textC: {
    fontSize: 14
  },
  itemMyMsgC: {
    alignItems: 'flex-end'
  },
  textBoxMyMsgC: {
    backgroundColor: Colors.cyan
  },
  textMyMsgC: {
    color: Colors.white
  },
  itemPeerMsgC: {
    alignItems: 'flex-start'
  },
  textBoxPeerMsgC: {
    backgroundColor: '#F1EFEF'
  },
  textPeerMsgC: {
    color: Colors.darkGrey
  },
  textBoxMyMsgImgC: {
    width: 170,
    height: 100,
    backgroundColor: Colors.lightGrey,
    padding: 4
  },
  textBoxPeerMsgImgC: {
    width: 170,
    height: 100,
    backgroundColor: Colors.lightGrey,
    padding: 4
  },
  imageMsg: {
    width: '100%',
    height: '100%',
    borderRadius: 7
  },
  textBoxFile: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGrey
  },
  textBoxMyMsgFileC: {},
  textBoxPeerMsgFileC: {},
  fileDownloadText: {
    paddingLeft: 10
  },

  input: {
    height: footerHeight,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingTop: 10,
    paddingBottom: (Platform.OS === 'android' ? 10 : 20),
  },
  inputFile: {
    flex: 1
  },
  inputFileIcon: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 15,
    width: 24,
    height: 24,
    paddingHorizontal: 3,
    paddingVertical: 3
  },
  inputBox: {
    flex: 9
  },
  textInput: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 16
  },
  sendBtn: {
    flex: 2,
    alignItems: 'flex-end'
  },
  submitBtn: {},
  submitBtnText: {
    color: Colors.cyan
  }
});
