import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Row, Col, FormGroup, Label, Input, Alert, FormFeedback} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {close, createProject} from '../actions/new_project_dialog_actions';

class NewProjectDialog extends Component {
    state = {
        name: '',
        description: '',
        invalidName: false
    };

    resetState = () => {
        this.setState({
            name: '',
            description: '',
            invalidName: false
        });
    };

    onChangeName = e => this.setState({name: e.target.value});

    onChangeDescription = e => this.setState({description: e.target.value});

    currentDate = () => (new Date()).toDateString();

    authorName = () => this.props.account ? this.props.account.fullName : 'Loading...';

    onSave = () => {
        if (!this.state.name) {
            this.setState({invalidName: true});
            return;
        }
        this.props.createProject(this.state.name, this.state.description);
        this.resetState();
    };

    onClose = () => {
        this.props.close();
        this.resetState();
    };

    render() {
        const errorBlock = this.props.error ? (
            <Alert color='danger'>
                {this.props.error}
            </Alert>
        ) : '';

        return (
            <Modal isOpen={this.props.isOpened} fade={true} size='lg'>
                <ModalHeader toggle={this.onClose}>New project</ModalHeader>
                <ModalBody>
                    {errorBlock}
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label for="projectName" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input id="projectName" type="text" placeholder="Project name"
                                           value={this.state.name}
                                           onChange={this.onChangeName}
                                           invalid={this.state.invalidName}/>
                                    <FormFeedback>Invalid name</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="projectDescription" sm={3}>Description</Label>
                                <Col sm={9}>
                                    <Input type="textarea" id="projectDescription"
                                           placeholder="Description"
                                           value={this.state.description}
                                           onChange={this.onChangeDescription}/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label sm={3}>Create date</Label>
                                <Col sm={9}>
                                    <Input type="text" placeholder="Project name"
                                           value={this.currentDate()} disabled={true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Author</Label>
                                <Col sm={9}>
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
    error: state.newProjectDialog.error,
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {open, close, createProject},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectDialog);
