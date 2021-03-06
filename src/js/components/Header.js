import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Button} from "reactstrap";
import {loadAccount, logout} from "../actions/auth_actions";

class Header extends Component {

    componentDidUpdate() {
        this.checkAndLoadAccount();
    }

    componentDidMount() {
        this.checkAndLoadAccount();
    }

    checkAndLoadAccount() {
        if (this.props.account == null && this.props.isAuthorized) {
            this.props.loadAccount();
        }
    }

    onLogout = () => {
        this.props.logout();
    };

    render() {
        const userInfo = (this.props.isAuthorized && this.props.account) ? (<ul className='navbar-nav'>
            <li className='nav-item'>
                <span className='mr-2 navbar-text'>
                    <strong>{this.props.account.fullName}</strong>
                </span>
                <Button color='danger' onClick={this.onLogout}>Logout</Button>
            </li>
        </ul>) : '';
        return (
            <nav className="navbar navbar-dark bg-dark justify-content-between header">
                <a className="navbar-brand" href="#"><h2>Plan everything</h2></a>
                {userInfo}
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {logout, loadAccount},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);