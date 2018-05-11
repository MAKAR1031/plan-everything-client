import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {closeReportDialog} from "../actions/tasks_actions";
import {
    Button, Col,
    Container,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row
} from "reactstrap";
import ReactMarkdown from 'react-markdown';

class TaskStepReportDialog extends Component {

    state = {
        report: {
            value: '',
            isInvalid: false
        },
        showPreview: false
    };

    onClose = () => this.props.close();

    onReportChange = e => this.setState({report: {value: e.target.value, isInvalid: false}});

    onPreviewToggle = () => this.setState(({showPreview}) => ({showPreview: !showPreview}));

    onSave = () => {
        let valid = true;
        if (!this.state.report.value) {
            this.setState(({report}) => ({report: {...report, isInvalid: true}}));
            valid = false;
        }
        if (valid) {
            this.props.onSaveReportHandler(this.props.step, this.state.report.value);
            this.props.close();
        }
    };

    render() {

        const preview = this.state.showPreview ? (
            <Fragment>
                <h4>Report preview:</h4>
                <Container className='mt-3 border'>
                    <ReactMarkdown source={this.state.report.value}/>
                </Container>
            </Fragment>
        ) : '';

        return (
            <Modal isOpen={this.props.isOpen} fade={true} size='lg'>
                <ModalHeader toggle={this.onClose}>Write report</ModalHeader>
                <ModalBody>
                    <Container>
                        <FormGroup row>
                            <Input
                                type='textarea'
                                value={this.state.report.value}
                                invalid={this.state.report.isInvalid}
                                onChange={this.onReportChange}/>
                            <FormFeedback>Report is empty</FormFeedback>
                        </FormGroup>
                    </Container>
                    <Container className='mt-3'>
                        <FormGroup row>
                            <Row>
                                <Col>
                                    <Label for='preview'>Preview</Label>
                                </Col>
                                <Col>
                                    <Input id='preview'
                                           type='checkbox'
                                           checked={this.state.showPreview}
                                           onChange={this.onPreviewToggle}/>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Container>
                    {preview}
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={this.onSave}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

TaskStepReportDialog.propTypes = {
    onSaveReportHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state, other) => ({
    isOpen: state.tasks.reportDialog.isOpen,
    step: state.tasks.reportDialog.step,
    onSaveReportHandler: other.onSaveReportHandler
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        close: closeReportDialog
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TaskStepReportDialog);