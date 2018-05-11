import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";

class EstimateCriterionItem extends Component {

    onChange = e => {
        const criterion = {
            ...this.props.criterion,
            actualValue: {
                value: e.target.value,
                isInvalid: false
            }
        };
        this.props.criterionChangeHandler(this.props.index, criterion);
    };

    render() {
        return (
            <Row>
                <Col sm={4}>
                    <Label for='actualValue'>{this.props.criterion.name}</Label>
                </Col>
                <Col>
                    <FormGroup>
                        <Input
                            id='actualValue'
                            type='number'
                            value={this.props.criterion.actualValue.value}
                            invalid={this.props.criterion.actualValue.isInvalid}
                            onChange={this.onChange}/>
                        <FormFeedback>Value is required</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

EstimateCriterionItem.propTypes = {
    index: PropTypes.number.isRequired,
    criterion: PropTypes.object.isRequired,
    criterionChangeHandler: PropTypes.func.isRequired
};

export default EstimateCriterionItem;