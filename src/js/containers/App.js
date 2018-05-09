import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route} from 'react-router-dom';
import RedirectToSignInComponent from '../components/RedirectToSignInComponent';
import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import AdminRouter from './AdminRouter';
import UserRouter from './UserRouter';
import {Router} from 'react-router';
import history from '../util/history';

class App extends Component {
    isRole = role => this.props.account ? this.props.account.role.code === role : false;

    isUser = () => this.props.isAuthorized && this.isRole('USER');

    isAdmin = () => this.props.isAuthorized && this.isRole('ADMIN');

    render() {
        const adminRoutes = this.isAdmin() ? (<AdminRouter/>) : '';
        const userRoutes = this.isUser() ? (<UserRouter/>) : '';

        return (
            <Router history={history}>
                <div>
                    <RedirectToSignInComponent/>
                    <Header/>
                    <Route exact path='/' component={SignInForm}/>
                    <Route path='/signup' component={SignUpForm}/>
                    {adminRoutes}
                    {userRoutes}
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    account: state.account
});

export default connect(mapStateToProps, null)(App);
