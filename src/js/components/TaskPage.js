import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Col, Container, Input, Progress, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {startEditTask, loadUpdateInfo} from "../actions/tasks_actions";
import moment from 'moment';
import sort from '../util/sort_by_order';

class TaskPage extends Component {

    componentDidMount() {
        this.checkAndLoadUpdateInfo();
    }

    componentDidUpdate() {
        this.checkAndLoadUpdateInfo();
    }

    checkAndLoadUpdateInfo = () => {
        if (!this.props.updateInfo && this.props.selected) {
            this.props.loadUpdateInfo(this.props.selected);
        }
    };

    projectName = () => this.props.project ? this.props.project.name : '';

    taskName = () => this.props.selected ? this.props.selected.name : '';

    taskDescription = () => this.props.selected ? this.props.selected.description : '';

    updateInfo = (field) => this.props.updateInfo ? (
        this.props.updateInfo[field] ?
            moment(this.props.updateInfo[field]).format('DD.MM.YYYY hh:mm') :
            '-'
    ) : 'Loading...';

    stepList = () => this.props.selected ? this.props.selected.steps.sort(sort) : [];

    stepsCompleted = () => this.props.selected ? this.props.selected.steps.filter(s => s.completed).length : 0;

    stepsTotal = () => this.props.selected ? this.props.selected.steps.length : 0;

    taskStatus = () => this.props.selected ? this.props.selected.status : '';

    taskAuthor = () => this.props.selected ? this.props.selected.author.account.fullName : '';

    taskAssignee = () => this.props.selected ? (
        this.props.selected.assignee ? this.props.selected.assignee.account.fullName : 'unassigned'
    ) : '';

    canEdit = () => this.props.selected ? this.props.selected._links.edit != null : false;

    onEdit = () => this.props.edit(this.props.selected);

    render() {

        const stepList = this.stepList().map(step => (
            <Row key={step.name} className='pl-3 mb-2'>
                <Col>
                    <Input
                        type='checkbox'
                        checked={step.completed}
                        disabled={step.completed}/>
                    <h6>{step.name}</h6>
                </Col>
            </Row>
        ));

        const editAction = this.canEdit() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onEdit}>Edit task</Button>
                </Col>
            </Row>
        ) : '';

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <Container fluid={true} className='main-container'>
                            <h2 className='text-center mt-2 mb-3'>{this.projectName()} - {this.taskName()}</h2>
                            <Container className='mb-4'>
                                <h4 className='text-muted'>{this.taskDescription()}</h4>
                            </Container>
                            <Container className='mb-4 p-3'>
                                <h5>Steps</h5>
                                <Progress value={this.stepsCompleted()} max={this.stepsTotal()}>
                                    {this.stepsCompleted()}/{this.stepsTotal()}
                                </Progress>
                                <Container className='mt-4'>
                                    {stepList}
                                </Container>
                            </Container>
                        </Container>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Row>
                            <Col>{this.updateInfo('createTime')}</Col>
                        </Row>
                        <Row>
                            <Col>{this.updateInfo('updateTime')}</Col>
                        </Row>
                        <Row>
                            <Col>{this.updateInfo('finishTime')}</Col>
                        </Row>
                        <Row>
                            <Col>{this.taskStatus()}</Col>
                        </Row>
                        <Row>
                            <Col>{this.taskAuthor()}</Col>
                        </Row>
                        <Row>
                            <Col>{this.taskAssignee()}</Col>
                        </Row>
                        {editAction}
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
    project: state.currentProject,
    selected: state.tasks.selected,
    updateInfo: state.tasks.updateInfo
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        edit: startEditTask,
        loadUpdateInfo
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);