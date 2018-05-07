import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class RedirectToSignInComponent extends Component {
    componentDidMount() {
        this.checkAndRedirect();
    }

    componentDidUpdate() {
        this.checkAndRedirect();
    }

    checkAndRedirect = () => {
        const pathname = this.props.history.location.pathname;
        if (!this.props.isAuthorized && (pathname !== '/' && pathname !== '/signup')) {
            this.props.history.push('/');
        }
    };

    render() {
        return '';
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized
});

export default withRouter(connect(mapStateToProps, null)(RedirectToSignInComponent));