import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Row} from "reactstrap";
import FontAwesome from 'react-fontawesome';

class TaskCriterion extends Component {

    onChangeField = e => {
        const {name, value} = e.target;
        const criterion = {
            ...this.props.criterion,
            [name]: {
                value,
                isInvalid: false
            }
        };
        this.props.onChangeHandler(criterion, this.props.index);
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
                               placeholder='Criterion name'
                               value={this.props.criterion.name.value}
                               invalid={this.props.criterion.name.isInvalid}
                               onChange={this.onChangeField}/>
                        <FormFeedback>Name is required</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                    <FormGroup>
                        <Input name='expectedValue'
                               type='number'
                               placeholder='Expected value'
                               value={this.props.criterion.expectedValue.value}
                               invalid={this.props.criterion.expectedValue.isInvalid}
                               onChange={this.onChangeField}/>
                        <FormFeedback>Expected value is required</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

TaskCriterion.propTypes = {
    index: PropTypes.number.isRequired,
    criterion: PropTypes.object.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    onRemoveHandler: PropTypes.func.isRequired
};

export default TaskCriterion;