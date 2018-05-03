import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signUp, resetSignUpStatus} from '../actions/auth_actions';
import alertify from 'alertify.js';
import {Container, Row, Col, FormGroup, Label, Input, FormFeedback, Button} from 'reactstrap';

alertify.logPosition("bottom right");

class SignUpForm extends Component {
    state = {
        firstName: {
            value: '',
            isInvalid: false
        },
        lastName: {
            value: '',
            isInvalid: false
        },
        login: {
            value: '',
            isInvalid: false
        },
        password: {
            value: '',
            isInvalid: false
        },
        email: {
            value: '',
            isInvalid: false
        }
    };

    componentDidUpdate() {
        if (this.props.status != null) {
            if (this.props.status) {
                this.props.history.push('/');
                alertify.success('Sign up successful');
                this.props.resetSignUpStatus();
            } else {
                alertify.alert('Sign up failed', () => {
                    this.props.resetSignUpStatus();
                });
            }
        }
    }

    onFirstNameChange = e => this.setState({firstName: {value: e.target.value, isInvalid: false}});

    onLastNameChange = e => this.setState({lastName: {value: e.target.value, isInvalid: false}});

    onLoginChange = e => this.setState({login: {value: e.target.value, isInvalid: false}});

    onPasswordChange = e => this.setState({password: {value: e.target.value, isInvalid: false}});

    onEmailChange = e => this.setState({email: {value: e.target.value, isInvalid: false}});

    onSignUp = () => {
        let valid = true;
        if (!this.state.firstName.value) {
            this.setState({firstName: {isInvalid: true}});
            valid = false;
        }
        if (!this.state.lastName.value) {
            this.setState({lastName: {isInvalid: true}});
            valid = false;
        }
        if (!this.state.login.value) {
            this.setState({login: {isInvalid: true}});
            valid = false;
        }
        if (!this.state.password.value) {
            this.setState({password: {isInvalid: true}});
            valid = false;
        }
        if (!this.state.email.value) {
            this.setState({email: {isInvalid: true}});
            valid = false;
        }
        if (valid) {
            this.props.signUp({
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value,
                login: this.state.login.value,
                password: this.state.password.value,
                email: this.state.email.value
            });
        }
    };

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={2} className='left-menu'/>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>Sign Up</h2>
                        <Container className='border p-3 w-50'>
                            <FormGroup row>
                                <Label for="firstName" sm={2}>First name</Label>
                                <Col sm={10}>
                                    <Input id="firstName"
                                           type="text"
                                           placeholder="First name"
                                           value={this.state.firstName.value}
                                           invalid={this.state.firstName.isInvalid}
                                           onChange={this.onFirstNameChange}/>
                                    <FormFeedback>Value is required</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastName" sm={2}>Last name</Label>
                                <Col sm={10}>
                                    <Input id="lastName"
                                           type="text"
                                           placeholder="Last name"
                                           value={this.state.lastName.value}
                                           invalid={this.state.lastName.isInvalid}
                                           onChange={this.onLastNameChange}/>
                                    <FormFeedback>Value is required</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="login" sm={2}>Login</Label>
                                <Col sm={10}>
                                    <Input id="login"
                                           type="text"
                                           placeholder="Login"
                                           value={this.state.login.value}
                                           invalid={this.state.login.isInvalid}
                                           onChange={this.onLoginChange}/>
                                    <FormFeedback>Value is required</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="password" sm={2}>Password</Label>
                                <Col sm={10}>
                                    <Input id="password"
                                           type="password"
                                           placeholder="Password"
                                           value={this.state.password.value}
                                           invalid={this.state.password.isInvalid}
                                           onChange={this.onPasswordChange}/>
                                    <FormFeedback>Value is required</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input id="email"
                                           type="email"
                                           placeholder="Email"
                                           value={this.state.email.value}
                                           invalid={this.state.email.isInvalid}
                                           onChange={this.onEmailChange}/>
                                    <FormFeedback>Value is required</FormFeedback>
                                </Col>
                            </FormGroup>
                            <Container className='text-center'>
                                <Button color="primary" onClick={this.onSignUp}>Sign Up</Button>
                            </Container>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    status: state.signUpStatus
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {signUp, resetSignUpStatus},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);