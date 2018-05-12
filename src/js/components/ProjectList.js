import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NewProjectDialog from './NewProjectDialog';
import {getAuthor, getCurrentMember, load, selectProject} from '../actions/projects_actions'
import {open as openDialog} from '../actions/new_project_dialog_actions';
import {Card, CardBody, Col, Container, Row} from "reactstrap";

class ProjectList extends Component {

    componentDidUpdate() {
        this.checkAndLoadProjects();
    }

    componentDidMount() {
        this.checkAndLoadProjects();
    }

    checkAndLoadProjects() {
        if (!this.props.projects) {
            this.props.load();
        }
    }

    projectsList = () => this.props.projects ? this.props.projects._embedded.projects : null;

    author = (project) => {
        if (this.props.projectAuthors[project]) {
            return this.props.projectAuthors[project].fullName;
        } else {
            this.props.getAuthor(project);
            return 'loading...';
        }
    };

    myMemberRole = (project) => {
        if (this.props.currentProjectMembers[project]) {
            return this.props.currentProjectMembers[project].role.name;
        } else {
            this.props.getCurrentMember(project);
            return 'loading...';
        }
    };

    onSelect = (project) => this.props.selectProject(project);

    render() {
        const projectList = this.projectsList() ? this.projectsList().map((project) => (
            <Card className='selectable-item mb-3' key={project.name} onClick={() => this.onSelect(project)}>
                <CardBody>
                    <Row>
                        <Col><strong>{project.name}</strong></Col>
                        <Col>{project.createDate}</Col>
                        <Col>{this.author(project)}</Col>
                        <Col>{this.myMemberRole(project)}</Col>
                    </Row>
                </CardBody>
            </Card>
        )) : (
            <Container>loading...</Container>
        );

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-2 left-menu">
                        <button className='btn btn-secondary' onClick={this.props.openDialog}>New project</button>
                    </div>
                    <div className="col-10">
                        <Container fluid={true} className='main-container'>
                            <h2 className='text-center mt-2 mb-3'>Project list</h2>
                            {projectList}
                        </Container>
                    </div>
                </div>
                <NewProjectDialog/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects,
    projectAuthors: state.projectAuthors,
    currentProjectMembers: state.currentProjectMembers
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load, getAuthor, getCurrentMember, openDialog, selectProject},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
