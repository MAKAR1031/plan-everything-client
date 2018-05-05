import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormFeedback,
    Button,
    FormGroup,
    Input,
    Col,
    Row,
} from "reactstrap";
import {loadRoles, changeRole, closeChangeRoleDialog} from '../actions/manage_account_actions';

class ChangeAccountRoleDialog extends Component {
    initialState = {
        selectedRole: {
            value: '',
            isInvalid: false
        }
    };

    state = this.initialState;

    componentDidMount() {
        this.checkAndLoadRoles();
    }

    componentDidUpdate() {
        this.checkAndLoadRoles();
    }

    checkAndLoadRoles() {
        if (!this.props.roles) {
            this.props.loadRoles();
        }
    }

    rolesList = () => this.props.roles ? this.props.roles._embedded.accountRoles : null;

    onClose = () => {
        this.props.closeChangeRoleDialog();
        this.resetState();
    };

    onRoleSelect = e => this.setState({selectedRole: {value: e.target.value, isInvalid: false}});

    onChangeRole = () => {
        let valid = true;
        if (!this.state.selectedRole.value) {
            this.setState({selectedRole: {isInvalid: true}});
            valid = false;
        }
        if (valid) {
            this.props.changeRole(this.props.selected, this.state.selectedRole.value);
            this.resetState();
        }
    };

    accountFullName = () => this.props.selected ? this.props.selected.fullName : '';

    resetState = () => this.setState(this.initialState);

    render() {
        const roleList = this.rolesList() ? (
            <Col>
                <Input id="accountRole"
                       type="select"
                       value={this.state.selectedRole.value}
                       invalid={this.state.selectedRole.isInvalid}
                       onChange={this.onRoleSelect}>
                    <option/>
                    {this.rolesList().map(role => (
                        <option value={role._links.self.href} key={role.code}>{role.name}</option>
                    ))}
                </Input>
                <FormFeedback>Invalid value</FormFeedback>
            </Col>
        ) : <Col>'Loading...'</Col>;

        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>Change role</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            Change role for account: <strong>{this.accountFullName()}</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup row>
                                {roleList}
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onChangeRole}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.accountManagement.changeRoleDialog.isOpen,
    roles: state.accountManagement.roles,
    selected: state.accountManagement.selectedAccount
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadRoles, changeRole, closeChangeRoleDialog},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccountRoleDialog);