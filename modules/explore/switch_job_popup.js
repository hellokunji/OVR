import React from 'react';
import {FlatList, View, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {isDataValid} from '../../utils/helpers';
import CommonPopup from '../common/popup/cmn_popup';
import TextComponent from '../common/uncategorized/text';
import {Colors} from '../../config/theme';

class SwitchJobPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeJobId: null
    }
  }

  componentWillMount() {
    this.setDefaultJob()
  }

  setDefaultJob = async () => {
    let index = 0;
    const defaultJob = await AsyncStorage.getItem('schoolDefaultJobId');
    if (defaultJob) {
      const findIndex = this.props.getJob.data.findIndex(item => item.id === defaultJob);
      if (findIndex !== -1) index = findIndex;
    }
    const job = this.props.getJob.data[index];
    this.setState({activeJobId: job.id});
  };

  handleSelectJob = activeJobId => {
    this.setState({activeJobId});
  };

  handleSelect = async () => {
    const {activeJobId} = this.state;
    await AsyncStorage.setItem('schoolDefaultJobId', activeJobId);
    this.props.onSelect();
  };

  render() {
    const {getJob} = this.props;
    const {activeJobId} = this.state;
    let data = [];
    if (isDataValid(getJob.data)) data = getJob.data;
    return (
      <CommonPopup
        visible={true}
        title='Select a Job'
        description='Select a job for which you want to see teachers'
        leftBtn={{
          show: true,
          label: 'Cancel',
          onClick: () => this.props.onHide()
        }}
        rightBtn={{
          show: true,
          label: 'Select',
          onClick: this.handleSelect
        }}
      >
        <View style={styles.main}>
          <FlatList
            extraData={activeJobId}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              // let description = `${item.currency} `;
              // let salaryIndex = salaryRange.findIndex(edge => edge.min === item.min_salary);
              // if (salaryIndex !== -1) description += salaryRange[salaryIndex].name;
              //console.log('item.id', item.id);
              return (
                <TouchableOpacity
                  style={[styles.item, activeJobId === item.id && styles.activeItem]}
                  onPress={() => this.handleSelectJob(item.id)}
                >
                  <View style={styles.iconBox}>
                    <View style={[styles.icon, activeJobId === item.id && styles.activeIcon]}/>
                  </View>
                  <View style={styles.content}>
                    <TextComponent
                      style={[styles.title, activeJobId === item.id && styles.activeTitle]}
                      text={item.job_title}
                      fontWeight={'Medium'}
                    />
                    <TextComponent style={styles.description} text={item.location}/>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </CommonPopup>
    )
  }
}

const mapStateToProps = state => {
  return {
    getJob: state.job.getJob
  }
};

export default connect(mapStateToProps, {})(SwitchJobPopup);

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  item: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  iconBox: {
    flex: 1
  },
  icon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.midGrey
  },
  content: {
    flex: 9
  },
  title: {
    fontSize: 14
  },
  description: {},
  activeItem: {
    backgroundColor: 'rgba(43, 183, 179, 0.05)',
    borderColor: 'rgba(43, 183, 179, 0.25)'
  },
  activeIcon: {
    borderColor: Colors.cyan,
    borderWidth: 5
  },
  activeTitle: {
    color: Colors.cyan
  }
});