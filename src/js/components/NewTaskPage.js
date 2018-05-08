import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Container, Row, Col, FormGroup, Input, Label, FormFeedback} from "reactstrap";
import {Link} from "react-router-dom";

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
        }
    };

    state = this.initialState;

    projectName = () => this.props.project ? this.props.project.name : '';

    onChangeField = e => {
        const {name, value} = e.target;
        this.setState({[name]: {value, isInvalid: false}}, () => console.log(this.state));
    };

    onSave = () => {
    };

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>New task</h2>
                        <Container className='w-50 border pb-1 pt-3 pl-3 pr-3 mb-3'>
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