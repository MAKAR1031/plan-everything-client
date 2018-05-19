import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";

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
                    <Button color='danger' onClick={this.onRemove}>X</Button>
                </Col>
                <Col sm={6}>
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
                <Col sm={3}>
                    <Label for={'stepNeedReport' + this.props.index}>Need report</Label>
                </Col>
                <Col sm={2}>
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