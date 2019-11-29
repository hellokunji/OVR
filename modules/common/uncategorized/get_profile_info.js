import React from 'react';
import {connect} from 'react-redux';
import {getProfileInfoStart} from '../../../store/actions/profile_info';
import {isDataValid} from '../../../utils/helpers';

class GetProfiles extends React.Component {

  componentWillMount() {
    const {profiles, idList} = this.props;

    let list = [];
    let iter = 0, len = idList.length;
    for (iter; iter < len; iter++) {
      const item = idList[iter];
      if (!isDataValid(profiles[item])) list.push(item);
    }

    if (list.length > 0) {
      let params = '';
      let iter = 0;
      let length = list.length;
      for (iter; iter < length; iter++) {
        params += list[iter];
        params += (iter !== length - 1) ? ',' : '';
      }
      this.props.getProfileInfoStart({idList: params});
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    profiles: state.profileInfo.profiles
  }
};

export default connect(mapStateToProps, {getProfileInfoStart})(GetProfiles);