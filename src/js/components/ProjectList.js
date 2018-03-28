import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load} from '../actions/projects_actions'

class ProjectList extends Component {

    componentDidMount() {
        this.props.load();
    }

    render() {
        return (
            <div/>
        )
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
