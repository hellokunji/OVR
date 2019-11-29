/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

/*import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Pdf from 'react-native-pdf';
import TextComponent from '../../common/uncategorized/text';
import {Colors} from '../../../config/theme';

const PDFViewer = props => {
  const {visible, source} = props;
  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={visible}
    >
      <View style={styles.main}>
        <View style={styles.box}>
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages,filePath)=>{
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages)=>{
              console.log(`current page: ${page}`);
            }}
            onError={(error)=>{
              console.log(error);
            }}
            style={styles.pdf}/>
        </View>
      </View>
    </Modal>
  )
};

PDFViewer.propTypes = {
  visible: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired
};

PDFViewer.defaultProps = {
};

export default PDFViewer;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    backgroundColor: Colors.white,
    maxWidth: 350,
    width: '90%',
    borderRadius: 10,
    shadowColor: Colors.midGrey,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  pdf: {
    width: '100%',
    height: '100%',
  }
});*/
