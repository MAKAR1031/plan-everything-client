import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Badge, Button, Card, CardBody, Col, Container, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import {loadTasks, open, select, startCreateNewTask, startEditTask} from '../actions/tasks_actions';
import ReactMarkdown from 'react-markdown';
import Search from "./Search";
import {parseDate} from "../util/time_utils";

class ProjectPage extends Component {

    state = {
        search: ''
    };

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

    tasksList = () => this.props.tasks ? (
        this.state.search ? (
            this.props.tasks._embedded.tasks.filter(t => t.name.includes(this.state.search))
        ) : this.props.tasks._embedded.tasks
    ) : [];

    isCurrent = (task) => this.props.selected ? this.props.selected._links.self.href === task._links.self.href : false;

    onSearch = e => this.setState({search: e.target.value});

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
                        <Col>
                            <Row>
                                <Col>{task.name}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    {task.tags.map(tag => (
                                        <Badge key={tag.name} className='mr-2'
                                               style={{backgroundColor: '#' + tag.color}}>
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Col>{task.status}</Col>
                    </Row>
                </CardBody>
            </Card>
        ));

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <Container fluid={true} className='main-container'>
                            <h2 className='text-center mt-2 mb-3'>{this.projectName()}</h2>
                            <Container className='mb-4'>
                                <ReactMarkdown source={this.projectDescription()}/>
                            </Container>
                            <Search placeholder='Search task...'
                                    query={this.state.search}
                                    onSearchHandler={this.onSearch}/>
                            {list}
                        </Container>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Container className='info-container'>
                            <Row>
                                <Col>{parseDate(this.projectDate())}</Col>
                            </Row>
                            <Row>
                                <Col>{this.projectAuthor()}</Col>
                            </Row>
                        </Container>
                        <Container className='actions-container'>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.canManageTasks()}
                                            onClick={this.onNewTask}>
                                        New task
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={this.props.selected == null}
                                            onClick={this.onOpenTask}>
                                        Open
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.canEditTask()}
                                            onClick={this.onEditTask}>
                                        Edit task
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.canManageTags()}
                                            onClick={this.onManageTags}>
                                        Manage tags
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary'
                                            disabled={!this.canManageMembers()}
                                            onClick={this.onManageMembers}>
                                        Manage members
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color='primary' disabled={true}>Close project</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to='projects'>Go back</Link>
                                </Col>
                            </Row>
                        </Container>
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