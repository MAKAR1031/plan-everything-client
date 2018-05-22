import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import FontAwesome from 'react-fontawesome';

class EditableTaskStep extends Component {

    onChangeField = e => {
        const {name, value} = e.target;
        const step = {
            ...this.props.step,
            [name]: {
                value,
                isInvalid: false
            }
        };
        this.props.onChangeHandler(step, this.props.index);
    };

    onToggle = () => {
        const step = {
            ...this.props.step,
            needReport: !this.props.step.needReport
        };
        this.props.onChangeHandler(step, this.props.index);
    };

    onRemove = () => this.props.onRemoveHandler(this.props.index);

    render() {
        return (
            <Row>
                <Col sm={1}>
                    <button className='cross-button' onClick={this.onRemove}>
                        <FontAwesome name='times' size='2x'/>
                    </button>
                </Col>
                <Col>
                    <FormGroup>
                        <Input name='name'
                               type='text'
                               placeholder='Step name'
                               value={this.props.step.name.value}
                               invalid={this.props.step.name.isInvalid}
                               onChange={this.onChangeField}/>
                        <FormFeedback>Invalid name</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={2}>
                    <Label for={'stepNeedReport' + this.props.index}>
                        <FontAwesome name='file' size='2x' title='Need report'/>
                    </Label>
                </Col>
                <Col sm={1} className='text-center'>
                    <Input id={'stepNeedReport' + this.props.index}
                           name='needReport'
                           type='checkbox'
                           checked={this.props.step.needReport}
                           onChange={this.onToggle}/>
                </Col>
            </Row>
        );
    };
}

EditableTaskStep.propTypes = {
    index: PropTypes.number.isRequired,
    step: PropTypes.object.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    onRemoveHandler: PropTypes.func.isRequired
};

export default EditableTaskStep;