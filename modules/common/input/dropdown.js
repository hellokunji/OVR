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
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import TextComponent from '../../common/uncategorized/text';
import Icon from '../../common/uncategorized/icon';
import {Colors} from '../../../config/theme';
import GlobalStyle from '../../../config/global_style';

class DropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      input: '',
      filtered: this.applyExcludeFilter(props.options)
    }
  }

  applyExcludeFilter = (options, excludeOptions = this.props.excludeOptions) => {
    let result = options;
    for (let iter = 0; iter < excludeOptions.length; iter++) {
      //console.log('filter');
      const findIndex = result.findIndex(item => item.name === excludeOptions[iter].name);
      if (findIndex !== -1) result.splice(findIndex, 1);
    }
    return result;
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options || this.props.excludeOptions !== nextProps.excludeOptions) {
      this.setState({filtered: this.applyExcludeFilter(nextProps.options, nextProps.excludeOptions)});
    }
  }

  toggleDropDown = () => {
    this.setState({isActive: !this.state.isActive});
  };

  changeInput = input => {
    this.setState({input}, () => this.filter())
  };

  filter = () => {
    const {input} = this.state;
    const {options} = this.props;
    let filtered = options;
    if (input.length > 0) {
      const searchOptions = {
        keys: ['name']
      };
      const fuse = new Fuse(options, searchOptions);
      filtered = fuse.search(input);
    }
    filtered = this.applyExcludeFilter(filtered);
    this.setState({filtered});
  };

  toggleOptions = () => {
    this.setState({isActive: !this.state.isActive});
  };

  render() {
    const {label, placeholder, value, onChange, isLoading, hasError, errorText} = this.props;
    const {isActive, input, filtered} = this.state;
    return (
      <View style={styles.main}>
        {label !== '' && <TextComponent text={label} style={GlobalStyle.inputLabel} fontWeight={'Light'}/>}
        <TouchableOpacity style={styles.preview} onPress={this.toggleOptions}>
          {value !== ''
            ? <TextComponent text={value} style={styles.previewValue}/>
            : <TextComponent text={placeholder} style={styles.previewPlaceholder}/>}
          <View style={styles.icon}>
            <Icon name='chevron-down' size={13}/>
          </View>
        </TouchableOpacity>
        {hasError && <TextComponent text={errorText} style={GlobalStyle.inputErrorText}/>}

        <Modal
          transparent={false}
          animationType='slide'
          visible={isActive}
        >
          <SafeAreaView>
            <View style={styles.modal}>
              <View style={styles.modalHead}>
                <TouchableOpacity style={styles.backBtn} onPress={this.toggleOptions}>
                  <Icon name='arrow-left' size={25}/>
                </TouchableOpacity>
                <TextInput style={styles.input} value={input} onChangeText={this.changeInput}/>
              </View>
              <View style={styles.body}>
                {!isLoading ? (
                  <FlatList
                    data={filtered}
                    keyExtractor={(item, index) => item.name}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            onChange(item.name);
                            this.toggleDropDown();
                          }}
                          style={styles.optionItem}
                        >
                          <TextComponent style={styles.optionItemText} text={item.name}/>
                        </TouchableOpacity>
                      )
                    }}
                  />
                ) : null}
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    )
  }
}

DropDown.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired, //Format[{'name': 'name'}]
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
  excludeOptions: PropTypes.array
};

DropDown.defaultProps = {
  placeholder: 'Select',
  label: '',
  value: '',
  excludeOptions: [],
  hasError: false,
  errorText: 'Invalid',
  isLoading: false
};

export default DropDown;

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  main: {},
  preview: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.midGrey,
    position: 'relative',
    paddingBottom: 7,
    paddingTop: 2
  },
  previewValue: {
    fontSize: 15
  },
  previewPlaceholder: {
    fontSize: 15,
    color: Colors.midGrey
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 6
  },

  modal: {},
  modalHead: {
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  backBtn: {
    width: 40,
    paddingTop: 7
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.midGrey,
    borderRadius: 20,
    height: 40,
    width: width - 40 - 40,
    paddingHorizontal: 15
  },
  body: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  optionItem: {
    paddingVertical: 5,
    marginVertical: 3
  },
  optionItemText: {
    fontSize: 18,
    fontWeight: '300'
  }
});