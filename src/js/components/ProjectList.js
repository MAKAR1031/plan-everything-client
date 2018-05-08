import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NewProjectDialog from './NewProjectDialog';
import {getAuthor, getCurrentMember, load, selectProject} from '../actions/projects_actions'
import {open as openDialog} from '../actions/new_project_dialog_actions';

class ProjectList extends Component {

    componentDidUpdate() {
        this.checkAndLoadProjects();
    }

    componentDidMount() {
        this.checkAndLoadProjects();
    }

    checkAndLoadProjects() {
        if (this.props.projectData == null) {
            this.props.load();
        }
    }

    projects = () => this.props.projectData['_embedded'].projects;

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

    onSelect = (project) => {
        this.props.selectProject(project);
        this.props.history.push('/project');
    };

    render() {
        const projectList = this.props.projectData ? this.projects().map((project) => (
            <div className='card selectable-item mb-3' key={project.name} onClick={() => this.onSelect(project)}>
                <div className='card-body'>
                    <div className='row'>
                        <div className="col-3"><strong>{project.name}</strong></div>
                        <div className="col-3">{project.createDate}</div>
                        <div className="col-3">{this.author(project)}</div>
                        <div className="col-3">{this.myMemberRole(project)}</div>
                    </div>
                </div>
            </div>
        )) : (
            <div>loading...</div>
        );

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-2 left-menu">
                        <button className='btn btn-secondary' onClick={this.props.openDialog}>New project</button>
                    </div>
                    <div className="col-10">
                        <h2 className='text-center mt-2 mb-3'>Project list</h2>
                        {projectList}
                    </div>
                </div>
                <NewProjectDialog />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projectData: state.projects,
    projectAuthors: state.projectAuthors,
    currentProjectMembers: state.currentProjectMembers
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load, getAuthor, getCurrentMember, openDialog, selectProject},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
