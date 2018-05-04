import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import ManageAccountsPage from '../components/ManageAccountsPage';
import ProjectList from '../components/ProjectList';
import ProjectPage from '../components/ProjectPage';

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
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
