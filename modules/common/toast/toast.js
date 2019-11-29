/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {toastUpdate} from '../../../store/actions/layout';
import {isDataValid} from '../../../utils/helpers';
import TextComponent from '../uncategorized/text';
import IcoMoon from '../uncategorized/icon';
import {Colors} from '../../../config/theme';

class Toast extends React.Component {

  componentDidUpdate() {
    const {toast} = this.props;
    const interval = isDataValid(toast.interval) ? toast.interval : 3000;
    setTimeout(() => {
      this.props.toastUpdate({show: false, type: null, content: {title: null, description: null}})
    }, interval)
  }

  render() {
    const {toast} = this.props;

    if (toast.show) {
      let iconName = '', color;
      if (toast.type === 'success') {
        color = Colors.green;
        iconName = 'checkmark-circle';
      } else if (toast.type === 'error') {
        color = Colors.red;
        iconName = 'cross-circle';
      } else if (toast.type === 'warning') {
        color = Colors.yellow;
        iconName = 'warning';
      } else {
        color = Colors.darkGrey;
        iconName = 'notification';
      }

      return (
        <View style={styles.main}>
          <View style={[styles.box]}>
            <View style={styles.icon}>
              <IcoMoon name={iconName} size={27} color={color}/>
            </View>
            <View style={styles.content}>
              <TextComponent style={styles.title} text={toast.content.title}/>
              <TextComponent className={styles.description} text={toast.content.description}/>
            </View>
          </View>
        </View>
      )
    }
    else return null;
  }
}

const mapStateToProps = state => {
  return {
    toast: state.layout.toast
  }
};

export default connect(mapStateToProps, {toastUpdate})(Toast);

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    zIndex: 10,
    bottom: 30,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 9,
    flexDirection: 'row',
    display: 'flex',
    width: 300,
    justifyContent: 'center',
    borderRadius: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowColor: Colors.lightGrey,
    elevation: 5
  },
  icon: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    flex: 6,
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    fontWeight: '500'
  },
  description: {
    fontSize: 14,
    color: Colors.midGrey
  }
});