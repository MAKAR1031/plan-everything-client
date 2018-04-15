import React, {Component} from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import ProjectList from '../components/ProjectList';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route exact path='/' component={LoginForm}/>
                    <Route path='/projects' component={ProjectList}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
