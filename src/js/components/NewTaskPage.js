import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Container, Row, Col, FormGroup, Input, Label, FormFeedback} from "reactstrap";
import {Link} from "react-router-dom";
import TaskStep from './TaskStep';
import TaskCriterion from './TaskCriterion';

class NewTaskPage extends Component {

    initialState = {
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

    state = this.initialState;

    projectName = () => this.props.project ? this.props.project.name : '';

    onChangeField = e => {
        const {name, value} = e.target;
        this.setState({[name]: {value, isInvalid: false}}, () => console.log(this.state));
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
    {},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskPage);