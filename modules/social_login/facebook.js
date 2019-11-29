import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
const queryString = require('query-string');
import {facebookLoginStart} from '../../store/actions/auth';
import PageLoader from '../common/loader/page_loader';

class FacebookLogin extends React.Component {

  constructor(props) {
    super(props);

    let url = '';
    const location = this.props.location;
    const parsed = queryString.parse(location.search);
    if (parsed.error) {
      window.location.href = '/signup';
    }
    if (location.pathname === '/auth/facebook/callback') {
      url = `/auth/facebook/validate-callback/${ location.search }`;
      this.props.facebookLoginStart(url);
    }

    this.state = {
      redirectTo: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fbSignIn !== nextProps.fbSignIn) {
      if (nextProps.fbSignIn.apiStatus === 'failure') {
        if (nextProps.fbSignIn.apiError.error) {
          if (nextProps.fbSignIn.apiError.error.code === 531) this.setState({redirectTo: '/'});
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
    fbSignIn: state.auth.fbSignIn
  };
};

export default connect(mapStateToProps, {facebookLoginStart})(FacebookLogin);