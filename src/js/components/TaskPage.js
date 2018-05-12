import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Container, Row, Col, Input, Progress, Badge} from 'reactstrap';
import {Link} from 'react-router-dom';
import {
    startEditTask,
    loadUpdateInfo,
    loadSteps,
    loadCriteria,
    loadEvents,
    completeStep,
    deleteTask,
    start,
    openReportDialog,
    openEstimateDialog
} from '../actions/tasks_actions';
import {openAssignDialog} from "../actions/tasks_actions";
import moment from 'moment';
import sort from '../util/sort_by_order';
import alertify from 'alertify.js';
import AssignTaskDialog from './AssignTaskDialog';
import TaskStepReportDialog from './TaskStepReportDialog';
import TaskEstimateDialog from './TaskEstimateDialog';
import ReactMarkdown from 'react-markdown';

class TaskPage extends Component {

    componentDidMount() {
        this.checkAndLoadData();
    }

    componentDidUpdate() {
        this.checkAndLoadData();
    }

    checkAndLoadData = () => {
        if (this.props.selected) {
            if (!this.props.updateInfo) {
                this.props.loadUpdateInfo(this.props.selected);
            }
            if (!this.props.steps) {
                this.props.loadSteps(this.props.selected);
            }
            if (!this.props.criteria) {
                this.props.loadCriteria(this.props.selected);
            }
            if (!this.props.criteria) {
                this.props.loadEvents(this.props.selected);
            }
        }
    };

    projectName = () => this.props.project ? this.props.project.name : '';

    taskName = () => this.props.selected ? this.props.selected.name : '';

    taskDescription = () => this.props.selected ? this.props.selected.description : '';

    updateInfo = (field) => this.props.updateInfo ? (
        this.props.updateInfo[field] ? moment(this.props.updateInfo[field]).format('DD.MM.YYYY hh:mm') : '-'
    ) : 'Loading...';

    stepList = () => this.props.steps ? this.props.steps._embedded.taskSteps.sort(sort) : [];

    criteriaList = () => this.props.criteria ? this.props.criteria._embedded.criteria.sort(sort) : [];

    eventsList = () => this.props.events ? this.props.events._embedded.taskEvents : [];

    stepsCompleted = () => this.stepList().filter(s => s.completed).length;

    stepsTotal = () => this.stepList().length;

    taskStatus = () => this.props.selected ? this.props.selected.status : '';

    taskAuthor = () => this.props.selected ? this.props.selected.author.account.fullName : '';

    taskAssignee = () => this.props.selected ? (
        this.props.selected.assignee ? this.props.selected.assignee.account.fullName : 'unassigned'
    ) : '';

    canEdit = () => this.props.selected ? this.props.selected._links.edit != null : false;

    canDelete = () => this.props.selected ? this.props.selected._links.delete != null : false;

    canAssign = () => this.props.selected ? this.props.selected._links.assign != null : false;

    canStart = () => this.props.selected ? this.props.selected._links.start != null : false;

    canComplete = (step) => step._links.complete != null;

    canEstimate = () => this.props.selected ? this.props.selected._links.estimate != null : false;

    onEdit = () => this.props.edit(this.props.selected);

    onDelete = () => {
        const task = this.props.selected;
        alertify
            .okBtn("Yes")
            .cancelBtn("No")
            .confirm(`Delete '${task.name}' task?`,
                () => this.props.deleteTask(task));
    };

    onAssign = () => this.props.openAssignDialog();

    onStart = () => this.props.start(this.props.selected);

    onStepComplete = (step) => {
        if (step.needReport) {
            this.props.openReportDialog(step);
            return;
        }
        this.props.completeStep(step, null);
    };

    onSaveReport = (step, report) => {
        this.props.completeStep(step, report);
    };

    onEstimate = () => this.props.openEstimateDialog();

    actualValueStyle = criterion => {
        const {expectedValue, actualValue} = criterion;
        return {
            color: actualValue >= expectedValue ? '#00CC00' : '#FF0033'
        }
    };

    render() {

        const stepList = this.stepList().map(step => (
            <Row key={step.name} className='pl-3 mb-2'>
                <Col>
                    <Input
                        type='checkbox'
                        checked={step.completed}
                        disabled={step.completed || !this.canComplete(step)}
                        onChange={() => this.onStepComplete(step)}/>
                    <h6>{step.name}</h6>
                </Col>
            </Row>
        ));

        const criteriaList = this.criteriaList().map(criterion => (
            <Row key={criterion.name} className='pl-3 mb-2'>
                <Col sm={4}>
                    <h6>{criterion.name}</h6>
                </Col>
                <Col sm={2}>
                    <h6>{criterion.expectedValue}</h6>
                </Col>
                <Col sm={2}>
                    {criterion.actualValue ? (
                        <h6 style={this.actualValueStyle(criterion)}>
                            {criterion.actualValue}
                        </h6>
                    ) : (
                        <h6>-</h6>
                    )}
                </Col>
            </Row>
        ));

        const eventsList = this.eventsList().map(event => (
            <Row key={event.time} className='pl-3 mb-2'>
                <Col>
                    <h6>{event.time}</h6>
                </Col>
                <Col>
                    <h6>{event.name}</h6>
                </Col>
                <Col>
                    <h6>{event.fullName}</h6>
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

        const deleteAction = this.canDelete() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onDelete}>Delete task</Button>
                </Col>
            </Row>
        ) : '';

        const assignAction = this.canAssign() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onAssign}>Assign task</Button>
                </Col>
            </Row>
        ) : '';

        const startAction = this.canStart() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onStart}>Start task</Button>
                </Col>
            </Row>
        ) : '';

        const estimateAction = this.canEstimate() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onEstimate}>Estimate task</Button>
                </Col>
            </Row>
        ) : '';

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <Container fluid={true} className='main-container'>
                            <h2 className='text-center mt-2 mb-3'>{this.projectName()} - {this.taskName()}</h2>
                            <Container className='mb-3'>
                                {this.props.selected.tags.map(tag => (
                                    <Badge key={tag.name} className='mr-2' style={{backgroundColor: '#' + tag.color}}>
                                        {tag.name}
                                    </Badge>
                                ))}
                            </Container>
                            <Container className='mb-4'>
                                <ReactMarkdown source={this.taskDescription()}/>
                            </Container>
                            <Container className='mb-4 p-3'>
                                <h5>Steps</h5>
                                <Progress value={this.stepsCompleted()} max={this.stepsTotal()}>
                                    {this.stepsCompleted()}/{this.stepsTotal()}
                                </Progress>
                                <Container className='mt-4'>
                                    {stepList}
                                </Container>
                                <h5>Criteria</h5>
                                <Container className='mt-4'>
                                    {criteriaList}
                                </Container>
                                <h5>History</h5>
                                <Container className='mt-4'>
                                    {eventsList}
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
                        {deleteAction}
                        {assignAction}
                        {startAction}
                        {estimateAction}
                        <Row>
                            <Col>
                                <Link to='project'>Go back</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <AssignTaskDialog/>
                <TaskStepReportDialog onSaveReportHandler={this.onSaveReport}/>
                <TaskEstimateDialog/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    project: state.currentProject,
    selected: state.tasks.selected,
    updateInfo: state.tasks.updateInfo,
    steps: state.tasks.steps,
    criteria: state.tasks.criteria,
    events: state.tasks.events
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        edit: startEditTask,
        deleteTask,
        loadUpdateInfo,
        loadSteps,
        loadCriteria,
        loadEvents,
        completeStep,
        start,
        openAssignDialog,
        openReportDialog,
        openEstimateDialog
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);