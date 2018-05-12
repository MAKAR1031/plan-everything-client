import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signIn} from "../actions/auth_actions";
import {Link} from 'react-router-dom'
import {Container, Row, Col, FormGroup, FormFeedback, Label, Input, UncontrolledAlert} from 'reactstrap';

class SignInForm extends Component {
    state = {
        username: {
            value: '',
            isInvalid: false
        },
        password: {
            value: '',
            isInvalid: false
        }
    };

    componentDidUpdate() {
        this.checkAuthorizationAndRedirect();
    }

    componentDidMount() {
        this.checkAuthorizationAndRedirect();
    }

    checkAuthorizationAndRedirect() {
        if (this.props.isAuthorized && this.props.account) {
            if (this.props.account.role.code === 'ADMIN') {
                this.props.history.push('/manageAccounts');
            } else {
                this.props.history.push('/projects');
            }
        }
    }

    onChangeLogin = e => this.setState({username: {value: e.target.value, isInvalid: false}});

    onChangePassword = e => this.setState({password: {value: e.target.value, isInvalid: false}});

    onSignIn = () => {
        let valid = true;
        if (!this.state.username.value) {
            this.setState({username: {isInvalid: true}});
            valid = false;
        }
        if (!this.state.password.value) {
            this.setState({password: {isInvalid: true}});
            valid = false;
        }
        if (valid) {
            this.props.login(this.state.username.value, this.state.password.value);
        }
    };

    render() {
        const errorBlock = this.props.error ? (
            <UncontrolledAlert color='danger'>
                {this.props.error}
            </UncontrolledAlert>
        ) : '';

        return (
            <Container>
                <h2 className='text-center mt-2 mb-3'>Sign In</h2>
                <Container className='w-50 border p-3'>
                    {errorBlock}
                    <FormGroup row>
                        <Label sm={2} for="username">Username</Label>
                        <Col sm={10}>
                            <Input id="username"
                                   type="text"
                                   placeholder="Enter username"
                                   value={this.state.username.value}
                                   invalid={this.state.username.isInvalid}
                                   onChange={this.onChangeLogin}/>
                            <FormFeedback>Value is required</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="password">Password</Label>
                        <Col sm={10}>
                            <Input id="password"
                                   type="password"
                                   placeholder="Enter password"
                                   value={this.state.password.value}
                                   invalid={this.state.password.isInvalid}
                                   onChange={this.onChangePassword}/>
                            <FormFeedback>Value is required</FormFeedback>
                        </Col>
                    </FormGroup>
                    <Container className="text-center">
                        <Row>
                            <Col>
                                <button className='btn btn-primary' onClick={this.onSignIn}>Sign in</button>
                            </Col>
                            <Col>
                                <Link to='/signup'>Sign up</Link>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    error: state.authError,
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {login: signIn},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);