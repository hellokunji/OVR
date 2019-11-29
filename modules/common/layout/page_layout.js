/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from '../uncategorized/icon';
import TextComponent from '../../common/uncategorized/text';
import ProgressBar from '../../common/uncategorized/progress_bar';
import {Colors} from '../../../config/theme';
import GlobalStyle from '../../../config/global_style';

class Layout extends React.Component {

  handleClickBack = () => {
    const {backTo, navigation, customBack, backFunc} = this.props;

    if (customBack) {
      backFunc();
    }
    else {
      if (backTo === 'default') {
        navigation.goBack();
      }
      else {
        navigation.navigate(backTo);
      }
    }
  };

  render() {

    const {children, title, additionalBtn, style, progressBar} = this.props;

    return (
      <SafeAreaView style={[GlobalStyle.droidSafeArea, styles.main]}>
        <ScrollView>
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={false}>
            <View style={styles.headerMain}>
              <View style={[styles.header, style === 'inline' && styles.headerInline]}>
                <TouchableOpacity style={style === 'inline' && styles.backBtnInline} onPress={this.handleClickBack}>
                  <Icon
                    name='arrow-left'
                    size={24}
                    color={Colors.darkGrey}
                  />
                </TouchableOpacity>
                <View style={styles.headerLine2}>
                  <TextComponent style={styles.buttonText} text={title} fontWeight='Black'/>
                  {progressBar.show && (
                    <TextComponent text={`${progressBar.value}%`} style={[styles.progressLabel]}/>
                  )}
                </View>
                {additionalBtn.show && (
                  <TouchableOpacity style={styles.additionalBtn} onPress={additionalBtn.onClick}>
                    <TextComponent style={styles.additionalBtnText} text={additionalBtn.label} fontWeight={'Light'}/>
                  </TouchableOpacity>
                )}
              </View>
              {progressBar.show && (
                <View style={styles.progress}>
                  <ProgressBar progress={progressBar.value} size='s' theme='default'/>
                </View>
              )}
            </View>
            <TouchableWithoutFeedback
              style={styles.container}
              onPress={Keyboard.dismiss}>
              <View>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </ScrollView>
        {/*<Toast/>*/}
      </SafeAreaView>
    )
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  backTo: PropTypes.string,
  customBack: PropTypes.bool,
  backFunc: PropTypes.func,
  additionalBtn: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func
  }),
  progressBar: PropTypes.shape({
    show: PropTypes.bool,
    value: PropTypes.number
  }),
  style: PropTypes.oneOf(['default', 'inline'])
};

Layout.defaultProps = {
  title: '',
  backTo: 'default',
  customBack: false,
  backFunc: () => {},
  additionalBtn: {
    show: false,
    label: null,
    onClick: null
  },
  progressBar: {
    show: false,
    value: 0
  },
  style: 'default'
};

export default withNavigation(connect(null, null)(Layout));

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    height,
    width
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  headerMain: {
    paddingHorizontal: 20,
    paddingTop: 0,
    //backgroundColor: 'red'
  },
  header: {
    //backgroundColor: '#fff',
    height: 85,
    position: 'relative'
  },
  headerInline: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 0,
    height: 'auto'
  },
  backBtnInline: {
    marginRight: 10,
    paddingTop: 5
  },
  additionalBtn: {
    position: 'absolute',
    top: 4,
    right: 0
  },
  additionalBtnText: {
    fontSize: 17
  },

  headerLine2: {
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 36,
    marginTop: 7
  },
  progress: {
    width: '100%',
    marginTop: 12
  },
  progressLabel: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginLeft: 8,
    fontSize: 20,
    color: Colors.midGrey,
    fontWeight: '100',
    zIndex: 5
  },
});