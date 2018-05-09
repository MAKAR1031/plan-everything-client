import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ChangeAccountRoleDialog from './ChangeAccountRoleDialog';
import {Button, Card, CardBody, Col, Container, Input, Row} from 'reactstrap';
import {loadAccounts, select, lock, unlock, openChangeRoleDialog} from '../actions/manage_account_actions';

class ManageAccountsPage extends Component {

    state = {
        search: ''
    };

    componentDidMount() {
        this.checkAndLoadAccounts();
    }

    componentDidUpdate() {
        this.checkAndLoadAccounts();
    }

    checkAndLoadAccounts() {
        if (!this.props.accounts) {
            this.props.loadAccounts();
        }
    }

    accounts = () => this.props.accounts ? (
        this.state.search ?
            this.props.accounts._embedded.accounts.filter(a =>
                a.fullName.includes(this.state.search) ||
                a.email.includes(this.state.search) ||
                a.login.includes(this.state.search)) :
            this.props.accounts._embedded.accounts
    ) : null;

    isCurrent = (account) => this.props.selected ?
        this.props.selected._links.self.href === account._links.self.href : false;

    onSelect = (account) => this.props.select(account);

    onSearch = e => this.setState({search: e.target.value});

    onLock = () => this.props.lock(this.props.selected);

    onUnlock = () => this.props.unlock(this.props.selected);

    onChangeRole = () => this.props.openChangeRoleDialog();

    checkLink = (name) => this.props.selected && this.props.selected._links[name];

    render() {
        const accountList = this.accounts() ? this.accounts().map(account => (
            <Card className={'selectable-item mb-3' + (this.isCurrent(account) ? ' selected' : '')}
                  key={account.login} onClick={() => this.onSelect(account)}>
                <CardBody>
                    <Row>
                        <Col sm={4}>{account.fullName}</Col>
                        <Col sm={4}>{account.role.name}</Col>
                        <Col sm={4}>{account.blocked ? 'blocked' : 'active'}</Col>
                    </Row>
                </CardBody>
            </Card>
        )) : <Container>Loading...</Container>;

        const lockAction = this.checkLink('lock') ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onLock}>Lock</Button>
                </Col>
            </Row>
        ) : '';

        const unlockAction = this.checkLink('unlock') ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onUnlock}>Unlock</Button>
                </Col>
            </Row>
        ) : '';

        const changeRoleAction = this.checkLink('changeRole') ? (
            <Row>
                <Col>
                    <Button color='primary' onClick={this.onChangeRole}>Change role</Button>
                </Col>
            </Row>
        ) : '';

        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={10}>
                        <Container fluid={true} className='main-container'>
                            <h2 className='text-center mt-2 mb-3'>Manage accounts</h2>
                            <Input
                                className='mb-4'
                                placeholder='Search account...'
                                value={this.state.search}
                                onChange={this.onSearch}/>
                            {accountList}
                        </Container>
                    </Col>
                    <Col sm={2} className='right-menu'>
                        {lockAction}
                        {unlockAction}
                        {changeRoleAction}
                    </Col>
                </Row>
                <ChangeAccountRoleDialog/>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    accounts: state.accountManagement.accounts,
    selected: state.accountManagement.selectedAccount,
    roles: state.accountManagement.roles
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadAccounts, select, lock, unlock, openChangeRoleDialog},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsPage);