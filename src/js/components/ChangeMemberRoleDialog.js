import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Container, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {closeChangeRoleDialog, loadRoles, changeRole} from "../actions/manage_members_actions";

class ChangeMemberRoleDialog extends Component {

    initialState = {
        role: {
            value: ''
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

    initDialog = () => {
        const currentRoleCode = this.props.selected.role.code;
        this.rolesList().forEach(role => {
            if (role.code === currentRoleCode) {
                this.setState({
                    role: {value: role._links.self.href},
                    initToEdit: true
                });
            }
        })
    };

    rolesList = () => this.props.roles ? this.props.roles._embedded.memberRoles : null;

    fullName = () => this.props.selected ? this.props.selected.account.fullName : 'Loading...';

    resetState = () => this.setState(this.initialState);

    onClose = () => {
        this.props.close();
        this.resetState();
    };

    onChangeRole = e => this.setState({role: {value: e.target.value}});

    onSave = () => {
        this.props.changeRole(this.props.selected, this.state.role.value);
        this.resetState();
    };

    render() {
        const roleList = this.rolesList() ? (
            <FormGroup>
                <Input id="memberRole"
                       type="select"
                       value={this.state.role.value}
                       onChange={this.onChangeRole}>
                    {this.rolesList().map(role => (
                        <option value={role._links.self.href} key={role.code}>{role.name}</option>
                    ))}
                </Input>
            </FormGroup>
        ) : <Container>'Loading...'</Container>;

        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>Change member role</ModalHeader>
                <ModalBody>
                    <Row className='mb-3'>
                        <Col>
                            <p>Change role for: {this.fullName()}</p>
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
    isOpen: state.membersManagement.changeMemberRoleDialog.isOpen,
    roles: state.membersManagement.roles,
    selected: state.membersManagement.selected
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        close: closeChangeRoleDialog,
        loadRoles,
        changeRole
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMemberRoleDialog);