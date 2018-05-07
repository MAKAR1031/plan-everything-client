import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import ManageAccountsPage from '../components/ManageAccountsPage';

class AdminRouter extends Component {
    render() {
        return(
            <Fragment>
                <Route path='/manageAccounts' component={ManageAccountsPage}/>
            </Fragment>
        );
    }
}

export default AdminRouter;