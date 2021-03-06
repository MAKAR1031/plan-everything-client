import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import ProjectList from '../components/ProjectList';
import ProjectPage from '../components/ProjectPage';
import TaskPage from '../components/TaskPage';
import TaskFormPage from '../components/TaskFormPage';
import ManageTagsPage from '../components/ManageTagsPage';
import ManageMembersPage from '../components/ManageMembersPage';

class UserRouter extends Component {
    render() {
        return (
            <Fragment>
                <Route path='/projects' component={ProjectList}/>
                <Route path='/project' component={ProjectPage}/>
                <Route path='/task' component={TaskPage}/>
                <Route path='/editTask' component={TaskFormPage}/>
                <Route path='/manageTags' component={ManageTagsPage}/>
                <Route path='/manageMembers' component={ManageMembersPage}/>
            </Fragment>
        );
    }
}

export default UserRouter;