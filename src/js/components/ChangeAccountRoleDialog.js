import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Container, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row,} from "reactstrap";
import {changeRole, closeChangeRoleDialog, loadRoles} from '../actions/manage_account_actions';

class ChangeAccountRoleDialog extends Component {
    initialState = {
        role: {
            value: '',
        },
        initToEdit: false
    };

    state = this.initialState;

    componentDidUpdate() {
        if (!this.props.isOpen) {
            return;
        }
        if (!this.props.roles) {
            this.props.loadRoles();
        }
        if (this.props.roles && this.props.selected && !this.state.initToEdit) {
            this.initDialog();
        }
    }

    initDialog() {
        const currentRoleCode = this.props.selected.role.code;
        this.rolesList().forEach(role => {
            if (role.code === currentRoleCode) {
                this.setState({
                    role: {value: role._links.self.href},
                    initToEdit: true
                });
            }
        });
    }

    rolesList = () => this.props.roles ? this.props.roles._embedded.accountRoles : null;

    onClose = () => {
        this.props.closeChangeRoleDialog();
        this.resetState();
    };

    onRoleChanged = e => this.setState({role: {value: e.target.value}});

    onSave = () => {
        this.props.changeRole(this.props.selected, this.state.role.value);
        this.resetState();
    };

    fullName = () => this.props.selected ? this.props.selected.fullName : '';

    resetState = () => this.setState(this.initialState);

    render() {
        const roleList = this.rolesList() ? (
            <FormGroup>
                <Input id="accountRole"
                       type="select"
                       value={this.state.role.value}
                       onChange={this.onRoleChanged}>
                    {this.rolesList().map(role => (
                        <option value={role._links.self.href} key={role.code}>{role.name}</option>
                    ))}
                </Input>
            </FormGroup>
        ) : <Container>'Loading...'</Container>;

        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>Change account role</ModalHeader>
                <ModalBody>
                    <Row className='mb-3'>
                        <Col>
                            <p>Change role: <strong>{this.fullName()}</strong></p>
                        </Col>
                    </Row>
                    {roleList}
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSave}>Save changes</Button>
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