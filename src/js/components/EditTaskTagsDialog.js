import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {closeEditTagsDialog, updateTags} from "../actions/tasks_actions";

class EditTaskTagsDialog extends Component {

    onClose = () => this.props.close();

    onSave = () => {
        this.props.updateTags(this.props.selected, null);
    };

    render() {
        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>Edit tags</ModalHeader>
                <ModalBody>
                    Edit tags dialog
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: state.tasks.editTagsDialog.isOpen,
    selected: state.tasks.selected
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        close: closeEditTagsDialog,
        updateTags
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskTagsDialog);