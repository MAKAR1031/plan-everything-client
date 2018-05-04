import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Row, Col, FormGroup, Label, Input, Alert, FormFeedback} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {close, createProject} from '../actions/new_project_dialog_actions';

class NewProjectDialog extends Component {
    initialState = {
        name: {
            value: '',
            isInvalid: false
        },
        description: {
            value: '',
            isInvalid: false
        }
    };

    state = this.initialState;

    resetState = () => this.setState(this.initialState);

    onChangeName = e => this.setState({name: {value: e.target.value, isInvalid: false}});

    onChangeDescription = e => this.setState({description: {value: e.target.value, isInvalid: false}});

    currentDate = () => (new Date()).toDateString();

    authorName = () => this.props.account ? this.props.account.fullName : 'Loading...';

    onSave = () => {
        if (this.props.isLoading) {
            return;
        }
        let valid = true;
        if (!this.state.name.value) {
            this.setState({name: {isInvalid: true}});
            valid = false;
        }
        if (valid) {
            this.props.createProject(this.state.name.value, this.state.description.value);
            this.resetState();
        }
    };

    onClose = () => {
        if (this.props.isLoading) {
            return;
        }
        this.props.close();
        this.resetState();
    };

    render() {
        const errorBlock = this.props.error ? (
            <Alert color='danger'>
                {this.props.error}
            </Alert>
        ) : '';

        const loadingBlock = this.props.isLoading ? (
            <Alert color='primary'>Loading...</Alert>
        ) : '';

        return (
            <Modal isOpen={this.props.isOpened} fade={true} size='lg'>
                <ModalHeader toggle={this.onClose}>New project</ModalHeader>
                <ModalBody>
                    {errorBlock}
                    {loadingBlock}
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label for="projectName" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input id="projectName" type="text" placeholder="Project name"
                                           value={this.state.name.value}
                                           invalid={this.state.name.isInvalid}
                                           onChange={this.onChangeName}/>
                                    <FormFeedback>Invalid name</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="projectDescription" sm={3}>Description</Label>
                                <Col sm={9}>
                                    <Input id="projectDescription"
                                           type="textarea"
                                           placeholder="Description"
                                           value={this.state.description.value}
                                           invalid={this.state.description.isInvalid}
                                           onChange={this.onChangeDescription}/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label sm={4}>Create date</Label>
                                <Col sm={8}>
                                    <Input type="text" placeholder="Project name"
                                           value={this.currentDate()} disabled={true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={4}>Author</Label>
                                <Col sm={8}>
                                    <Input type="text" placeholder="Project name"
                                           value={this.authorName()} disabled={true}/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isOpened: state.newProjectDialog.isOpened,
    isLoading: state.newProjectDialog.isLoading,
    error: state.newProjectDialog.error,
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {open, close, createProject},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectDialog);
