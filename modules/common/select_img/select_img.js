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
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadImageMobileStart, uploadImageStart} from '../../../store/actions/upload';
import ImagePicker from 'react-native-image-crop-picker';
import TextComponent from '../uncategorized/text';
import IcoMoon from '../uncategorized/icon';
import {Colors} from '../../../config/theme';
import GlobalStyle from '../../../config/global_style';

class SelectImg extends React.Component {

  state = {
    upload: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.uploadImage !== nextProps.uploadImage) {
      if (nextProps.uploadImage.apiStatus === 'success' && this.props.uploadImage.apiStatus !== 'success') {
        if (this.state.upload) this.props.onChange(nextProps.uploadImage.data.url);
      }
    }
  };

  shouldComponentUpdate() {
    return true;
  }

  openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      showCropFrame: true,
      mediaType: 'image',
      includeBase64: true
    }).then(image => {
      this.setState({upload: true}, () => {
        this.uploadImage(image);
      });
    });
  };

  uploadImage = image => {
    this.props.uploadImageMobileStart(image);
  };

  render() {
    const {imgSrc, uploadImage, addBtnLabel, componentStyle, hasError, errorText} = this.props;
    const {upload} = this.state;
    return (
      <React.Fragment>
        {componentStyle === 'default' && (
          <React.Fragment>
            {imgSrc === null ? (
              <View style={[styles.main, styles.mainEmpty]}>
                <TouchableOpacity style={styles.emptyBox} onPress={this.openPicker}>
                  <IcoMoon name='camera2' size={72} color={Colors.darkGrey}/>
                  <View style={styles.btn}>
                    {(uploadImage.apiStatus === 'started' && upload) ?
                      (<ActivityIndicator size='small' color={Colors.midGrey}/>) :
                      <TextComponent text={addBtnLabel} style={styles.btnText}/>}
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={[styles.main, styles.mainSelected]}>
                  <ImageBackground style={styles.selectedBox} source={{uri: imgSrc}}>
                    <TouchableOpacity style={[styles.btn, styles.btnSelected]} onPress={this.openPicker}>
                      {(uploadImage.apiStatus === 'started' && upload) ?
                        (<ActivityIndicator size='small' color={Colors.midGrey}/>) :
                        <TextComponent text={addBtnLabel} style={styles.btnText}/>}
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              </View>
            )}
            {hasError && <TextComponent text={errorText} style={GlobalStyle.inputErrorText}/>}
          </React.Fragment>
        )}
        {componentStyle === 'plusIcon' && (
          <TouchableOpacity style={styles.plusBtn} onPress={this.openPicker}>
            {(uploadImage.apiStatus === 'started' && upload)
              ? <ActivityIndicator size='small' color={Colors.midGrey}/>
              : <IcoMoon name='plus' size={30} color={Colors.lightGrey}/>}
          </TouchableOpacity>
        )}
      </React.Fragment>
    )
  }
}

SelectImg.propTypes = {
  imgSrc: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  addBtnLabel: PropTypes.string,
  changeBtnLabel: PropTypes.string,
  aspectDimension: PropTypes.number,
  componentStyle: PropTypes.string,
  hasError: PropTypes.bool,
  errorText: PropTypes.string
};

SelectImg.defaultProps = {
  imgSrc: null,
  addBtnLabel: 'Add Photo',
  changeBtnLabel: 'Change Photo',
  aspectDimension: null,
  componentStyle: 'default',
  hasError: false,
  errorText: 'Invalid',
};

const mapStateToProps = state => {
  return {
    uploadImage: state.upload.uploadImage
  }
};

export default connect(mapStateToProps, {uploadImageMobileStart, uploadImageStart})(SelectImg);

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: ((width - 40) * .7)
  },
  mainEmpty: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    backgroundColor: '#eeeeee',
    paddingBottom: 30
  },
  emptyBox: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    position: 'relative'
  },
  btn: {
    width: 160,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 15
  },

  mainSelected: {
    borderColor: Colors.lightGrey,
    borderWidth: 1
  },
  selectedBox: {
    //justifyContent: 'center',
    width: '100%',
    height: ((width - 40) * .7),
    //alignSelf: 'center',
    //flex: 1,
    position: 'relative'
  },
  btnSelected: {
    bottom: 30
  },

  plusBtn: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
