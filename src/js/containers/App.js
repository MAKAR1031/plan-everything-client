import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import ManageAccountsPage from '../components/ManageAccountsPage';
import ProjectList from '../components/ProjectList';
import ProjectPage from '../components/ProjectPage';
import ManageTagsPage from '../components/ManageTagsPage';
import ManageMembersPage from '../components/ManageMembersPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path='/' component={SignInForm}/>
                    <Route path='/signup' component={SignUpForm}/>
                    <Route path='/manageAccounts' component={ManageAccountsPage}/>
                    <Route path='/projects' component={ProjectList}/>
                    <Route path='/project' component={ProjectPage}/>
                    <Route path='/manageTags' component={ManageTagsPage}/>
                    <Route path='/manageMembers' component={ManageMembersPage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
