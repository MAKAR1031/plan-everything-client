import React, {Component} from 'react';
import {connect} from "react-redux";
import {BrowserRouter, Route} from 'react-router-dom';
import RedirectToSignInComponent from '../components/RedirectToSignInComponent';
import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import AdminRouter from './AdminRouter';
import UserRouter from './UserRouter';

class App extends Component {
    isRole = role => this.props.account ? this.props.account.role.code === role : false;

    isUser = () => this.props.isAuthorized && this.isRole('USER');

    isAdmin = () => this.props.isAuthorized && this.isRole('ADMIN');

    render() {
        const adminRoutes = this.isAdmin() ? (<AdminRouter/>) : '';
        const userRoutes = this.isUser() ? (<UserRouter/>) : '';

        return (
            <BrowserRouter>
                <div>
                    <RedirectToSignInComponent/>
                    <Header/>
                    <Route exact path='/' component={SignInForm}/>
                    <Route path='/signup' component={SignUpForm}/>
                    {adminRoutes}
                    {userRoutes}
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    account: state.account
});

export default connect(mapStateToProps, null)(App);
