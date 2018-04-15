import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from "../actions/login_actions";
import {Link} from 'react-router-dom'

class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    };

    changeLogin = evt => this.setState({username: evt.target.value});

    changePassword = evt => this.setState({password: evt.target.value});

    hasToken = () => this.props.token !== '';

    onLogin = () => {
        this.props.login(this.state.username, this.state.password);
    };

    render() {
        const form = (
            <div className='container'>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" className="form-control" placeholder="Enter username"
                           value={this.state.username} onChange={this.changeLogin}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" className="form-control" placeholder="Enter password"
                           value={this.state.password} onChange={this.changePassword}/>
                </div>
                <div className="text-center">
                    <button className='btn btn-primary' onClick={this.onLogin}>Login</button>
                </div>
            </div>
        );
        if (this.hasToken()) {
            return (
                <div className='container'>
                    <p>The login is already completed</p>
                    <Link className='btn btn-secondary' role='button' to="/projects">Go to projects</Link>
                </div>
            );
        } else {
            return form;
        }
    }
}

const mapStateToProps = state => ({
    token: state.token
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {login},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);