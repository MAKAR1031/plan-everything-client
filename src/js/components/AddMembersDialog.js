import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {loadNonProjectAccounts, closeAddMembersDialog} from "../actions/manage_members_actions";

class AddMembersDialog extends Component {

    componentDidMount() {
        this.checkAndLoadAccounts();
    }

    componentDidUpdate() {
        this.checkAndLoadAccounts();
    }

    checkAndLoadAccounts = () => {
        if (this.props.isOpen && this.props.project && !this.props.accounts) {
            this.props.loadAccounts(this.props.project);
        }
    };

    accountsList = () => this.props.accounts ? this.props.accounts._embedded.accounts : null;

    onClose = () => this.props.close();

    onSave = () => this.props.close();

    render() {
        const list = this.accountsList() ? this.accountsList().map(a => (
            <Row>
                <Col>{a.fullName}</Col>
            </Row>
        )) : (
            <Container>Loading...</Container>
        );
        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>Add members</ModalHeader>
                <ModalBody>
                    {list}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.membersManagement.addMembersDialog.isOpen,
    project: state.currentProject,
    accounts: state.membersManagement.addMembersDialog.accounts
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        loadAccounts: loadNonProjectAccounts,
        close: closeAddMembersDialog
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMembersDialog);