/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import TextComponent from '../common/uncategorized/text';
import {Colors} from "../../config/theme";

class Conversation extends React.Component {

  constructor(props) {
    super(props);
    //this.msgHistory = React.createRef();
    //this.flatList = React.createRef();
  }

  componentDidMount() {
    this.handleScrollBottom();
  }

  handleScrollBottom = () => {
    //console.log('hello');
    //const node = this.msgHistory.current;
    //node.scrollTop = node.scrollHeight;

    ///const node = this.flatList.current;
    //node.scrollTop = node.flatList;
    //this.flatList.scrollToEnd();
  };

  render() {

    const {userId} = this.props;

    return (
      <View style={styles.main}>
        <FlatList
          style={styles.flatList}
          ref={ref => this.flatList = ref}
          onContentSizeChange={() => {
            //console.log('onContentSizeChange');
            this.flatList.scrollToEnd({animated: true});
          }}
          onLayout={() => this.flatList.scrollToEnd({animated: true})}
          data={this.props.conversation}
          renderItem={({item}) => {
            let component = null;
            if (item.author === userId) {
              component = (
                <View style={[styles.item, styles.itemMyMsg]}>
                  <View style={[styles.textBox, styles.textBoxMyMsg]}>
                    <TextComponent style={[styles.text, styles.textMyMsg]} text={item.body}/>
                  </View>
                </View>
              )
            }
            else {
              component = (
                <View style={[styles.item, styles.itemPeerMsg]}>
                  <Image source={{uri: 'https://randomuser.me/api/portraits/men/0.jpg'}}/>
                  <View style={[styles.textBox, styles.textBoxPeerMsg]}>
                    <TextComponent style={[styles.text, styles.textPeerMsg]} text={item.body}/>
                  </View>
                </View>
              )
            }
            return component;
          }}
        />
      </View>
    )

    /*return (
      <div className='conversation' ref={this.msgHistory}>
        <div>
          {conversationList.map((item, index) => {
            let component = null;
            if (item.author === 'me') {
              component = (
                <div className='item item_my_msg'>
                  <div className='text'>{item.text}</div>
                </div>
              )
            }
            else {
              component = (
                <div className='item item_peer_msg'>
                  <img src='https://randomuser.me/api/portraits/men/0.jpg'/>
                  <div className='text'>{item.text}</div>
                </div>
              )
            }
            return component;
          })}
        </div>
      </div>
    )*/
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  }
};

export default connect(mapStateToProps, null)(Conversation);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    paddingVertical: 10,
  },
  flatList: {
    height: '100%'
  },
  item: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 17
  },
  textBox: {
    width: 'auto',
    padding: 10,
    borderRadius: 7
  },
  text: {
    fontSize: 14
  },
  itemMyMsg: {
    alignItems: 'flex-end'
  },
  textBoxMyMsg: {
    backgroundColor: Colors.cyan
  },
  textMyMsg: {
    color: Colors.white
  },
  itemPeerMsg: {
    alignItems: 'flex-start'
  },
  textBoxPeerMsg: {
    backgroundColor: '#F1EFEF'
  },
  textPeerMsg: {
    color: Colors.darkGrey
  }
});