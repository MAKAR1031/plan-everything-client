import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Row, Col, Button} from 'reactstrap';
import {Link} from "react-router-dom";

class ProjectPage extends Component {

    projectName = () => this.props.project ? this.props.project.name : '';

    projectDescription = () => this.props.project ? this.props.project.description : '';

    projectDate = () => this.props.project ? this.props.project.createDate : '';

    projectAuthor = () => this.props.project ? this.props.projectAuthors[this.props.project].fullName : '';

    onNewTask = () => this.props.history.push('/newTask');

    onManageTags = () => this.props.history.push('/manageTags');

    onManageMembers = () => this.props.history.push('/manageMembers');

    canManageTasks = () => this.props.project ? this.props.project._links.manageTasks != null : false;

    canManageTags = () => this.props.project ? this.props.project._links.manageTags != null : false;

    canManageMembers = () => this.props.project ? this.props.project._links.manageMembers != null : false;

    render() {
        const newTaskAction = this.canManageTasks() ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onNewTask}>New task</Button>
                </Col>
            </Row>
        ) : '';

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
                        <h5 className='mt-2 mb-3'>{this.projectDescription()}</h5>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        <Row>
                            <Col>{this.projectDate()}</Col>
                        </Row>
                        <Row>
                            <Col>{this.projectAuthor()}</Col>
                        </Row>
                        {newTaskAction}
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
    projectAuthors: state.projectAuthors,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);