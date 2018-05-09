import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Card, CardBody, Col, Container, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import {loadTasks, select, open, startCreateNewTask, startEditTask} from '../actions/tasks_actions';

class ProjectPage extends Component {

    componentDidMount() {
        this.checkAndLoadTasks();
    }

    componentDidUpdate() {
        this.checkAndLoadTasks();
    }

    checkAndLoadTasks = () => {
        if (!this.props.tasks && this.props.project) {
            this.props.loadTasks(this.props.project);
        }
    };

    projectName = () => this.props.project ? this.props.project.name : '';

    projectDescription = () => this.props.project ? this.props.project.description : '';

    projectDate = () => this.props.project ? this.props.project.createDate : '';

    projectAuthor = () => this.props.project ? this.props.projectAuthors[this.props.project].fullName : '';

    tasksList = () => this.props.tasks ? this.props.tasks._embedded.tasks : [];

    isCurrent = (task) => this.props.selected ? this.props.selected._links.self.href === task._links.self.href : false;

    onSelect = (task) => this.props.select(task);

    onNewTask = () => this.props.newTask();

    onOpenTask = () => this.props.open();

    onEditTask = () => this.props.editTask(this.props.selected);

    onManageTags = () => this.props.history.push('/manageTags');

    onManageMembers = () => this.props.history.push('/manageMembers');

    canEditTask = () => this.props.selected ? this.props.selected._links.edit != null : false;

    canManageTasks = () => this.props.project ? this.props.project._links.manageTasks != null : false;

    canManageTags = () => this.props.project ? this.props.project._links.manageTags != null : false;

    canManageMembers = () => this.props.project ? this.props.project._links.manageMembers != null : false;

    render() {
        const list = this.tasksList().map(task => (
            <Card className={'selectable-item mb-3' + (this.isCurrent(task) ? ' selected' : '')}
                  key={task._links.self.href} onClick={() => this.onSelect(task)}>
                <CardBody>
                    <Row>
                        <Col>{task.name}</Col>
                        <Col>{task.status}</Col>
                    </Row>
                </CardBody>
            </Card>
        ));

        const newTaskAction = this.canManageTasks() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onNewTask}>New task</Button>
                </Col>
            </Row>
        ) : '';

        const openTaskAction = this.props.selected ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onOpenTask}>Open</Button>
                </Col>
            </Row>
        ) : '';

        const editTaskAction = this.canEditTask() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onEditTask}>Edit task</Button>
                </Col>
            </Row>
        )  : '';

        const manageTagsAction = this.canManageTags() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onManageTags}>Manage tags</Button>
                </Col>
            </Row>
        ) : '';

        const manageMembersAction = this.canManageMembers() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onManageMembers}>Manage members</Button>
                </Col>
            </Row>
        ) : '';


        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <h2 className='text-center mt-2 mb-3'>{this.projectName()}</h2>
                        <Container className='mb-4'>
                            <h4 className='text-muted'>{this.projectDescription()}</h4>
                        </Container>
                        {list}
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Row>
                            <Col>{this.projectDate()}</Col>
                        </Row>
                        <Row>
                            <Col>{this.projectAuthor()}</Col>
                        </Row>
                        {newTaskAction}
                        {openTaskAction}
                        {editTaskAction}
                        {manageTagsAction}
                        {manageMembersAction}
                        <Row>
                            <Col>
                                <Link to='projects'>Go back</Link>
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
    tasks: state.tasks.list,
    selected: state.tasks.selected,
    projectAuthors: state.projectAuthors,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        loadTasks,
        select,
        open,
        newTask: startCreateNewTask,
        editTask: startEditTask
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);