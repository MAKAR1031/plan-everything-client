import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Input,
    Button,
    Label,
    FormGroup,
    FormFeedback
} from 'reactstrap';
import {closeDialog, createTag, editTag} from "../actions/manage_tags_actions";

class TagDialog extends Component {

    initialState = {
        name: {
            value: '',
            isInvalid: false
        },
        color: {
            value: '#FFFFFF'
        },
        initToEdit: false
    };

    state = this.initialState;

    componentDidUpdate() {
        if (this.props.isOpen && this.props.isEditMode && this.props.selected && !this.state.initToEdit) {
            this.setState({
                name: {
                    value: this.props.selected.name,
                    isInvalid: false
                },
                color: {
                    value: '#' + this.props.selected.color
                },
                initToEdit: true
            });
        }
    }

    dialogTitle = () => this.props.isEditMode ? 'Edit tag' : 'New tag';

    onChangeName = e => this.setState({name: {value: e.target.value, isInvalid: false}});

    onChangeColor = e => this.setState({color: {value: e.target.value}});

    onClose = () => {
        this.props.closeDialog();
        this.resetState();
    };

    onSave = () => {
        let valid = true;
        if (!this.state.name.value) {
            this.setState({name: {isInvalid: true}});
            valid = false;
        }
        if (valid) {
            const tag = {
                name: this.state.name.value,
                color: this.state.color.value.replace('#', '')
            };
            if (this.props.isEditMode) {
                this.props.editTag(this.props.project, this.props.selected, tag);
            } else {
                this.props.createTag(this.props.project, tag);
            }
            this.resetState();
        }
    };

    resetState = () => this.setState(this.initialState);

    render() {
        return (
            <Modal isOpen={this.props.isOpen} fade={true}>
                <ModalHeader toggle={this.onClose}>{this.dialogTitle()}</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label for='tagName' sm={3}>Name</Label>
                        <Col sm={9}>
                            <Input id='tagName' type='text' placeholder='Tag name'
                                   value={this.state.name.value}
                                   invalid={this.state.name.isInvalid}
                                   onChange={this.onChangeName}/>
                            <FormFeedback>Invalid name</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='tagColor' sm={3}>Color</Label>
                        <Col sm={9}>
                            <Input id='tagColor' type='color' placeholder='Tag color'
                                   value={this.state.color.value}
                                   onChange={this.onChangeColor}/>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    project: state.currentProject,
    selected: state.tagsManagement.selected,
    isOpen: state.tagsManagement.dialog.isOpen,
    isEditMode: state.tagsManagement.dialog.isEditMode
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {closeDialog, createTag, editTag},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TagDialog);