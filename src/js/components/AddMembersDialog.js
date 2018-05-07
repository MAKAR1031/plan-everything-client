import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {closeAddMembersDialog} from "../actions/manage_members_actions";

class AddMembersDialog extends Component {

    onClose = () => this.props.close();

    onSave = () => this.props.close();

    render() {
        return (
            <Modal isOpen={this.props.isOpen} fade={true} size='lg'>
                <ModalHeader toggle={this.onClose}>Add members</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.membersManagement.addMembersDialog.isOpen
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        close: closeAddMembersDialog
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMembersDialog);