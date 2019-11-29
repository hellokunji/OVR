import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
const queryString = require('query-string');
import {linkedInLoginStart} from '../../store/actions/auth';
import PageLoader from '../common/loader/page_loader';

class LinkedInLogin extends React.Component {

  constructor(props) {
    super(props);

    let url = '';
    const location = this.props.location;
    const parsed = queryString.parse(location.search);
    if (parsed.error) {
      window.location.href = '/signup';
    }
    if (location.pathname === '/auth/linkedin/callback') {
      url = `/auth/linkedin/validate-callback/${ location.search }`;
      this.props.linkedInLoginStart(url);
    }

    this.state = {
      redirectTo: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.linkedInSignIn !== nextProps.linkedInSignIn) {
      if (nextProps.linkedInSignIn.apiStatus === 'failure') {
        if (nextProps.linkedInSignIn.apiError.error) {
          if (nextProps.linkedInSignIn.apiError.error.code === 531) this.setState({redirectTo: '/'});
        }
      }
    }
  }

  render() {

    const {redirectTo} = this.state;
    if (redirectTo !== null) return <Redirect to={redirectTo}/>;

    return <PageLoader/>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    linkedInSignIn: state.auth.linkedInSignIn
  };
};

export default connect(mapStateToProps, {linkedInLoginStart})(LinkedInLogin);