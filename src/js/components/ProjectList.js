import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load} from '../actions/projects_actions'

class ProjectList extends Component {

    componentDidMount() {
        this.props.load();
    }

    projects = () => this.props.projectData['_embedded'].projects;

    render() {
        if (this.props.projectData != null) {
            return (
                <ul>
                    {
                        this.projects().map((project) => (
                            <li key={project.name}>{project.name}</li>
                        ))
                    }
                </ul>
            );
        } else {
            return (
                <div>loading...</div>
            )
        }
    }
}

const mapStateToProps = state => ({
    projectData: state.projects
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
