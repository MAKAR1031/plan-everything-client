import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Container, Row, Col, FormGroup, Input, Label, FormFeedback} from "reactstrap";
import {Link} from "react-router-dom";
import TaskStep from './TaskStep';
import TaskCriterion from './TaskCriterion';
import linkUtils from '../util/link-utils';
import {createTask} from "../actions/tasks_actions";

class NewTaskPage extends Component {

    state = {
        name: {
            value: '',
            isInvalid: false
        },
        description: {
            value: '',
            isInvalid: false
        },
        finishDate: {
            value: '',
            isInvalid: false
        },
        steps: [],
        criteria: []
    };

    projectName = () => this.props.project ? this.props.project.name : '';

    onChangeField = e => {
        const {name, value} = e.target;
        this.setState({[name]: {value, isInvalid: false}});
    };

    onAddStep = () => {
        this.setState(({steps}) => ({
            steps: [
                ...steps,
                {
                    name: {
                        value: '',
                        isInvalid: false
                    },
                    needReport: false
                }
            ]
        }));
    };

    onChangeStep = (step, index) => {
        this.setState({
            steps: this.state.steps.map((s, i) => i === index ? step : s)
        })
    };

    onRemoveStep = (index) => {
        const steps = this.state.steps;
        steps.splice(index, 1);
        this.setState({steps});
    };

    onAddCriterion = () => {
        this.setState(({criteria}) => ({
            criteria: [
                ...criteria,
                {
                    name: {
                        value: '',
                        isInvalid: false
                    },
                    expectedValue: {
                        value: 0,
                        isInvalid: false
                    }
                }
            ]
        }));
    };

    onChangeCriterion = (criterion, index) => {
        this.setState({
            criteria: this.state.criteria.map((c, i) => i === index ? criterion : c)
        })
    };

    onRemoveCriterion = (index) => {
        const criteria = this.state.criteria;
        criteria.splice(index, 1);
        this.setState({criteria});
    };

    onSave = () => {
        let valid = true;
        if (!this.state.name.value) {
            this.setState(({name}) => ({name: {...name, isInvalid: true}}));
            valid = false;
        }
        if (this.state.finishDate.value) {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const finishDate = new Date(this.state.finishDate.value);
            if (now >= finishDate) {
                this.setState(({finishDate}) => ({finishDate: {...finishDate, isInvalid: true}}));
                valid = false;
            }
        }
        if (this.state.steps.length === 0) {
            valid = false;
        } else {
            const steps = this.state.steps.map(step => {
                const invalidName = !step.name.value;
                if (!invalidName) {
                    return step;
                }
                valid = false;
                return {
                    ...step,
                    name: {
                        ...step.name,
                        isInvalid: invalidName
                    }
                };
            });
            this.setState({steps});
        }
        if (this.state.criteria.length === 0) {
            valid = false;
        } else {
            const criteria = this.state.criteria.map(criterion => {
                const invalidName = !criterion.name.value;
                const invalidExpectedValue = !criterion.expectedValue.value;
                if (!invalidName && !invalidExpectedValue) {
                    return criterion;
                }
                valid = false;
                return {
                    ...criterion,
                    name: {
                        ...criterion.name,
                        isInvalid: invalidName
                    },
                    expectedValue: {
                        ...criterion.expectedValue,
                        isInvalid: invalidExpectedValue
                    }
                };
            });
            this.setState({criteria});
        }
        if (valid) {
            const task = {
                name: this.state.name.value,
                description: this.state.description.value,
                expectedCompleteDate: this.state.finishDate.value,
                project: linkUtils.linkUrl(this.props.project._links.self)
            };
            const steps = this.state.steps.map(step => ({
                name: step.name.value,
                needReport: step.needReport
            }));
            const criteria = this.state.criteria.map(criterion => ({
                name: criterion.name.value,
                expectedValue: criterion.expectedValue.value
            }));
            this.props.createTask(task, steps, criteria);
        }
    };

    render() {

        const stepList = this.state.steps.length > 0 ? this.state.steps.map((step, i) => (
            <TaskStep index={i}
                      key={i}
                      step={step}
                      onChangeHandler={this.onChangeStep}
                      onRemoveHandler={this.onRemoveStep}/>
        )) : <Container className='text-danger text-center'>No steps</Container>;

        const criteriaList = this.state.criteria.length > 0 ? this.state.criteria.map((criterion, i) => (
            <TaskCriterion index={i}
                           key={i}
                           criterion={criterion}
                           onChangeHandler={this.onChangeCriterion}
                           onRemoveHandler={this.onRemoveCriterion}/>
        )) : <Container className='text-danger text-center'>No criteria</Container>;

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>New task</h2>
                        <Container className='w-50 border p-3 mb-3'>
                            <Container className='w-75'>
                                <FormGroup row>
                                    <Label for='taskName' sm={2}>Name</Label>
                                    <Col>
                                        <Input id='taskName'
                                               name='name'
                                               type='text'
                                               placeholder='Task name'
                                               value={this.state.name.value}
                                               invalid={this.state.name.isInvalid}
                                               onChange={this.onChangeField}/>
                                        <FormFeedback>Invalid name</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='taskDescription' sm={2}>Description</Label>
                                    <Col>
                                        <Input id='taskDescription'
                                               name='description'
                                               type='textarea'
                                               placeholder='Task description'
                                               value={this.state.description.value}
                                               invalid={this.state.description.isInvalid}
                                               onChange={this.onChangeField}/>
                                        <FormFeedback>Invalid description</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='finishDate' sm={2}>Finish date</Label>
                                    <Col>
                                        <Input id='finishDate'
                                               name='finishDate'
                                               type='date'
                                               placeholder='Finish date'
                                               value={this.state.finishDate.value}
                                               invalid={this.state.finishDate.isInvalid}
                                               onChange={this.onChangeField}/>
                                        <FormFeedback>Invalid finish date</FormFeedback>
                                    </Col>
                                </FormGroup>
                            </Container>
                        </Container>

                        <Container className='w-50 border p-3 mb-3'>
                            <Container className='w-75'>
                                {stepList}
                                <Row>
                                    <Col className='text-right'>
                                        <Button color='primary' onClick={this.onAddStep}>Add step</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>

                        <Container className='w-50 border p-3 mb-3'>
                            <Container className='w-75'>
                                {criteriaList}
                                <Row>
                                    <Col className='text-right'>
                                        <Button color='primary' onClick={this.onAddCriterion}>Add criterion</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Row>
                            <Col>
                                <p>Project name: {this.projectName()}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color='primary' onClick={this.onSave}>Save changes</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to='project'>Go back</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    project: state.currentProject
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {createTask},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskPage);