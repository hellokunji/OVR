/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2019. Bo Zun (Tianjin) Education Technology Co., Ltd. and/or its affiliates. All rights reserved.
 * Bo Zun (Tianjin) Education Technology Co., Ltd. PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {uploadImageStart, uploadImageMobileStart} from '../../../store/actions/upload';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import TextComponent from '../../common/uncategorized/text';
import GlobalStyle from '../../../config/global_style';
import {Colors} from '../../../config/theme';
import IcoMoon from '../uncategorized/icon';
import {apiConfig} from "../../../config/config";

//let RNFS = require('react-native-fs');

class FileInput extends React.Component {

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

  chooseFile = () => {
    this.setState({upload: true}, () => {
      const {folderName} = this.props;
      DocumentPicker.show({
        filetype: [DocumentPickerUtil.pdf()],
      }, (error, res) => {
        if (res) {
          let reqPayload = {
            filename: decodeURI(res.fileName),
            path: decodeURI(res.uri.replace('file://', '')),
            mime: 'application/pdf'
          };
          if (folderName) reqPayload.folderName = folderName;
          this.props.uploadImageMobileStart(reqPayload);
          /*this.uploadFiles([
            {
              name: 'filename',
              filename: res.fileName,
              path: res.uri,
              filetype: 'application/pdf',
              mimetype: 'application/pdf',
              type: 'application/pdf',
            }
          ])*/
        }
        //console.log('res1', res);
        // Android
        /*console.log(
          res.uri,
          res.type, // mime type
          res.fileName,
          res.fileSize
        );*/
      });
    });
  };

  uploadFiles = (files) => {

    //console.log('files', files);

    const uploadBegin = (response) => {
      const jobId = response.jobId;
      //console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    const uploadProgress = (response) => {
      const percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
      //console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    RNFS.uploadFiles({
      toUrl: `${apiConfig('v1')}/upload/image`,
      files: files,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJjcmVhdGVkQXQiOjE1NTk0NTM0MTAsInJvbGUiOiJTQ0hPT0wiLCJpc3MiOiJvdmVyZmxvIiwiZXhwIjoxNTkwOTg5NDEwLCJ1c2VySWQiOiIyYzkyYWI1MjZhNTlmNjk4MDE2YTVlYjYzNGYyMDAwYyJ9.DGnWT1cW0jHbZg_704uMG1EXh1-Wtd95FxDM5z-428rb6Q0amVniBSHJTQw-JxvLIQ1ClfBcsIZCnhdesLYVYQfSmAU008OKdVmJdx3WurvfPjMrwES665CdtWwD4QrkCQFVc54vw9xsXm5M2dfnqhYhp8ljgAF4U0PODIGTDIE47mFyUlKb-DzEzusegTuMdbrjSybHafv7-wYk6uUXtPWTJQ22HgAr73qC-E7jQ00CsPWMV6maih7ALSDqvjMR1yT7SjOa8Yqi10jqV6c0zG1A0IRIQ0zESdeUMOBPjpzzhZayRX8z4apU8HSjAGMEI5a7YCzCH7E1of0uaPSy3A'
      },
      fields: {
        'hello': 'world',
      },
      begin: uploadBegin,
      progress: uploadProgress
    }).promise.then((response) => {
      //console.log(response.statusCode, response.headers, response.body);
      if (response.statusCode === 200) {
        //console.log(response.statusCode, response.headers, response.body);
        //console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      } else {
        //console.log('SERVER ERROR');
      }
    })
      .catch((err) => {
        if (err.description === "cancelled") {
          // cancelled by user
        }
        //console.log(err);
      });
  };

  render() {
    const {label, placeholder, value, onChange, uploadImage} = this.props;
    const {upload} = this.state;
    return (
      <View style={styles.main}>
        {label !== '' && <TextComponent text={label} style={GlobalStyle.inputLabel} fontWeight={'Light'}/>}
        {value === null || value === '' ? (
          <TouchableOpacity style={[styles.file, styles.uploadFile]} onPress={this.chooseFile}>
            {(uploadImage.apiStatus === 'started' && upload) ? (
              <React.Fragment>
                <ActivityIndicator size='small' color={Colors.lightGrey}/>
                <TextComponent text='Uploading...' style={styles.uploadLabelText}/>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <IcoMoon name='plus' size={15}/>
                <TextComponent
                  text={placeholder}
                  style={styles.uploadLabelText}
                />
              </React.Fragment>
            )}
          </TouchableOpacity>
        ) : (
          <View style={[styles.file, styles.uploadedFile]}>
            <TextComponent
              text={value}
              style={styles.valueText}
              numberOfLines={1}
            />
            <TouchableOpacity
              onPress={() => onChange('')}
              style={styles.removeFileBtn}
            >
              <IcoMoon name='cross2' size={15} color={Colors.red}/>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

FileInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  folderName: PropTypes.string
};

FileInput.defaultProps = {
  label: '',
  placeholder: '',
  value: ''
};

const mapStateToProps = state => {
  return {
    uploadImage: state.upload.uploadImage
  }
};

export default connect(mapStateToProps, {uploadImageStart, uploadImageMobileStart})(FileInput);

const styles = StyleSheet.create({
  main: {},
  uploadLabelText: {
    marginLeft: 5
  },
  file: {
    borderStyle: 'dashed',
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    flexDirection: 'row',
    height: 34,
    paddingVertical: 7,
    paddingHorizontal: 8,
    paddingRight: 35
  },
  valueText: {
    flex: 1
  },
  uploadFile: {},
  uploadedFile: {},
  removeFileBtn: {
    position: 'absolute',
    right: 9,
    top: 9,
    zIndex: 5
  }
});