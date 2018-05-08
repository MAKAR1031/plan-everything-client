import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Container, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {loadNonProjectAccounts, addAccountToProject, closeAddMembersDialog} from "../actions/manage_members_actions";
import MemberCheckbox from './MemberCheckbox';

class AddMembersDialog extends Component {
    componentWillMount = () => {
        this.newMemberAccounts = new Set();
    };

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

    onSave = () => {
        this.newMemberAccounts.forEach(accountUrl => this.props.addToProject(this.props.project, accountUrl));
        this.newMemberAccounts.clear();
        this.props.close();
    };

    onToggleCheckbox = (accountLink) => {
        if (this.newMemberAccounts.has(accountLink)) {
            this.newMemberAccounts.delete(accountLink);
        }  else {
            this.newMemberAccounts.add(accountLink);
        }
    };

    render() {
        const list = this.accountsList() ? this.accountsList().map(a => (
            <MemberCheckbox key={a.login} account={a} onToggleHandler={this.onToggleCheckbox}/>
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
        addToProject: addAccountToProject,
        close: closeAddMembersDialog
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMembersDialog);